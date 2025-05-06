import { CommonModule } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { MaritimeDashboardComponent } from './dashboard.component';
import { ConfirmationService } from './modals-popups/confirmation.service';
import * as MaritimeActions from './state/maritime.actions';
import { MaritimeDataService } from './state/data.service';

import { provideHttpClientTesting } from '@angular/common/http/testing'; // Use HttpClientTestingModule

describe('MaritimeDashboardComponent', () => {
  let component: MaritimeDashboardComponent;
  let fixture: ComponentFixture<MaritimeDashboardComponent>;
  let store: MockStore;
  let confirmationService: jasmine.SpyObj<ConfirmationService>;
  let maritimeDataService: jasmine.SpyObj<MaritimeDataService>; // Spy for MaritimeDataService

  const initialState = {
    maritime: {
      isLoading: false,
      ports: [],
      ships: [],
      visitedCountries: [],
      voyages: [],
    },
  };

  beforeEach(async () => {
    const confirmationServiceSpy = jasmine.createSpyObj('ConfirmationService', [
      'openModal',
      'getModalData',
    ]);
    confirmationServiceSpy.getModalData.and.returnValue(of({}));

    const maritimeDataServiceSpy = jasmine.createSpyObj('MaritimeDataService', [
      'getPorts',
      'getShips',
      'getCountries',
      'getVoyages'
    ]);

    // Mock any service methods as needed
    maritimeDataServiceSpy.getPorts.and.returnValue(of([])); // example return value

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MaritimeDashboardComponent
      ],
      providers: [
        provideHttpClientTesting(),
        provideMockStore({ initialState }),
        { provide: ConfirmationService, useValue: confirmationServiceSpy },
        { provide: MaritimeDataService, useValue: maritimeDataServiceSpy },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    confirmationService = TestBed.inject(
      ConfirmationService
    ) as jasmine.SpyObj<ConfirmationService>;
    maritimeDataService = TestBed.inject(
      MaritimeDataService
    ) as jasmine.SpyObj<MaritimeDataService>; // Inject the mock
    fixture = TestBed.createComponent(MaritimeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch actions on ngOnInit', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(MaritimeActions.loadPorts());
    expect(store.dispatch).toHaveBeenCalledWith(MaritimeActions.loadShips());
    expect(store.dispatch).toHaveBeenCalledWith(
      MaritimeActions.loadCountries()
    );
    expect(store.dispatch).toHaveBeenCalledWith(MaritimeActions.loadVoyages());
  });

  it('should set active tab correctly', () => {
    component.setActiveTab('ships');
    expect(component.activeTab).toBe('ships');
  });

  it('should filter data correctly', () => {
    const items = [{ name: 'Test Ship' }, { name: 'Another Ship' }];
    const result = component.filterData(items, 'test');
    expect(result).toEqual([{ name: 'Test Ship' }]);
  });

  it('should toggle sort correctly', () => {
    component.toggleSort('name');
    expect(component.sortColumn).toBe('name');
    expect(component.sortDirection).toBe('asc');

    component.toggleSort('name');
    expect(component.sortDirection).toBe('desc');

    component.toggleSort('name');
    expect(component.sortColumn).toBeNull();
    expect(component.sortDirection).toBeNull();
  });

  it('should handle editing an item', () => {
    spyOn(store, 'dispatch');
    component.ports = [{ id: 1, name: 'Port 1', country: 'Country 1' }];
    component.onEditItem('port', 1, { name: 'Updated Port' });
    expect(component.ports[0].name).toBe('Updated Port');
    expect(store.dispatch).toHaveBeenCalledWith(
      MaritimeActions.editPort({
        id: 1,
        changes: { id: 1, name: 'Updated Port' },
      })
    );
  });

  it('should handle deleting an item', fakeAsync(() => {
    spyOn(store, 'dispatch');
    confirmationService.openModal.and.returnValue(Promise.resolve(true));
    component.ports = [{ id: 1, name: 'Port 1', country: 'Country 1' }];
    
    component.onDeleteItem('port', 1);
    tick();  // Ensure async tasks have completed before assertions
  
    expect(component.ports.length).toBe(0);
    expect(store.dispatch).toHaveBeenCalledWith(
      MaritimeActions.deletePort({ id: 1 })
    );
  }));
  

  it('should handle saving popup data', () => {
    spyOn(store, 'dispatch');
    component.handleSavePopup({
      type: 'port',
      data: { name: 'New Port', country: 'New Country' },
    });
    expect(store.dispatch).toHaveBeenCalledWith(
      MaritimeActions.addPort({
        port: { name: 'New Port', country: 'New Country' },
      })
    );
  });

  it('should show and hide the delete modal', () => {
    component.showDeleteModal('port', 1);
    expect(component.isModalVisible).toBeTrue();
    expect(component.modalItemType).toBe('port');
    expect(component.modalItemId).toBe(1);

    component.handleModalCancel();
    expect(component.isModalVisible).toBeFalse();
  });

  it('should show and hide the popup', () => {
    component.showPopup();
    expect(component.isPopupVisible).toBeTrue();

    component.hidePopup();
    expect(component.isPopupVisible).toBeFalse();
  });
});
