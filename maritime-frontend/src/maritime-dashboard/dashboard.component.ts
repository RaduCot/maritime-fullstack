import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import { MaritimeState } from './state/maritime.state';
import * as MaritimeActions from './state/maritime.actions';

// Import Ngx-charts module
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SvgIconComponent } from '../app/assets/svgicon.component';

import { VoyagesTableComponent } from './tables/voyages.component';
import { ShipsTableComponent } from './tables/ships.component';
import { PortsTableComponent } from './tables/ports.component';
import { CountriesTableComponent } from './tables/countries.component';

import { ConfirmationModalComponent } from './modals-popups/confirmation.component';
import { ConfirmationService } from './modals-popups/confirmation.service';

import { AddDataPopupComponent } from './modals-popups/popup.component';
import { map } from 'rxjs';

interface Port {
  id: number;
  name: string;
  country: string;
}

interface Ship {
  id: number;
  name: string;
  maxSpeed: number;
}

interface VisitedCountry {
  id: number;
  countryName: string;
}

interface Voyage {
  id: number;
  voyageDate: string;
  departurePortId: number;
  arrivalPortId: number;
  voyageStart: string;
  voyageEnd: string;
  departurePort?: Port;
  arrivalPort?: Port;
  duration?: number;
}

@Component({
  selector: 'app-maritime-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxChartsModule,
    SvgIconComponent,
    VoyagesTableComponent,
    ShipsTableComponent,
    PortsTableComponent,
    CountriesTableComponent,
    ConfirmationModalComponent,
    AddDataPopupComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class MaritimeDashboardComponent implements OnInit {
  ports: Port[] = [];
  ships: Ship[] = [];
  visitedCountries: VisitedCountry[] = [];
  voyages: Voyage[] = [];

  activeTab: 'voyages' | 'ships' | 'ports' | 'countries' = 'voyages';
  searchTerm: string = '';
  isLoading: boolean = true;
  currentYear: number = new Date().getFullYear();

  voyagesChartData: any[] = [];
  shipsChartData: any[] = [];
  portsChartData: any[] = [];
  countriesChartData: any[] = [];

  sortColumn: string | null = 'id';
  sortDirection: 'asc' | 'desc' | null = 'desc';

  isModalVisible: boolean = false;
  modalItemType: string = '';
  modalItemId: number | null = null;

  isPopupVisible: boolean = false;

  constructor(
    private store: Store<{ maritime: MaritimeState }>,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(MaritimeActions.loadPorts());
    this.store.dispatch(MaritimeActions.loadShips());
    this.store.dispatch(MaritimeActions.loadCountries());
    this.store.dispatch(MaritimeActions.loadVoyages());

    this.store
      .select('maritime')
      .pipe(
        map((state) => ({
          ports: state.ports,
          ships: state.ships,
          visitedCountries: state.visitedCountries,
          voyages: state.voyages,
          isLoading: state.isLoading,
        }))
      )
      .subscribe(({ ports, ships, visitedCountries, voyages, isLoading }) => {
        this.isLoading = isLoading;
        this.ports = ports.map((port) => ({ ...port, isEditing: false }));
        this.ships = ships.map((ship) => ({ ...ship, isEditing: false }));
        this.visitedCountries = visitedCountries;
        this.voyages = voyages.map((voyage) => ({
          ...voyage,
          departurePort: ports.find(
            (port) => port.id === voyage.departurePortId
          ),
          arrivalPort: ports.find((port) => port.id === voyage.arrivalPortId),
        }));

        //Calculate voyage durations in hours
        this.voyages.forEach((voyage) => {
          const start = new Date(voyage.voyageStart).getTime();
          const end = new Date(voyage.voyageEnd).getTime();
          voyage.duration = (end - start) / (1000 * 60 * 60);
        });

        // Prepare chart data
        this.voyagesChartData = this.voyages.map((voyage) => ({
          name: `Voyage ${voyage.id}`,
          value: voyage.duration || 0,
        }));

        this.shipsChartData = this.ships.map((ship) => ({
          name: ship.name,
          value: ship.maxSpeed,
        }));

        const portVoyageCounts = this.ports.map((port) => ({
          name: port.name,
          value: this.voyages.filter(
            (voyage) =>
              voyage.departurePortId === port.id ||
              voyage.arrivalPortId === port.id
          ).length,
        }));

        this.portsChartData = portVoyageCounts;

        this.countriesChartData = this.visitedCountries.map((country) => ({
          name: country.countryName,
          value: 1, // Assuming each country is visited once
        }));
      });
  }

  setActiveTab(tab: 'voyages' | 'ships' | 'ports' | 'countries'): void {
    this.activeTab = tab;
  }

  filterData(items: any[], term: string): any[] {
    if (!term) return items;

    const lowerTerm = term.toLowerCase();

    return items.filter((item) => {
      return Object.values(item).some((val) => {
        if (val == null) return false;

        // Check if value is an object (like departurePort)
        if (typeof val === 'object') {
          return Object.values(val).some(
            (nestedVal) =>
              nestedVal != null &&
              nestedVal.toString().toLowerCase().includes(lowerTerm)
          );
        }

        // Fallback for primitive values
        return val.toString().toLowerCase().includes(lowerTerm);
      });
    });
  }

  getFilteredData(): any[] {
    let data: any[];
    switch (this.activeTab) {
      case 'voyages':
        data = this.voyages;
        break;
      case 'ships':
        data = this.ships;
        break;
      case 'ports':
        data = this.ports;
        break;
      case 'countries':
        data = this.visitedCountries;
        break;
      default:
        data = [];
    }

    const filtered = this.filterData(data, this.searchTerm);

    if (this.sortColumn && this.sortDirection) {
      return [...filtered].sort((a, b) => {
        const aValue = this.sortColumn
          ? this.getNestedValue(a, this.sortColumn)
          : null;
        const bValue = this.sortColumn
          ? this.getNestedValue(b, this.sortColumn)
          : null;

        if (aValue == null || bValue == null) return 0;

        const comparison = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return filtered;
  }

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((o, key) => o?.[key], obj);
  }

  toggleSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection =
        this.sortDirection === 'asc'
          ? 'desc'
          : this.sortDirection === 'desc'
          ? null
          : 'asc';
      if (!this.sortDirection) this.sortColumn = null;
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  onEditItem(itemType: string, id: number, changes: any): void {
    switch (itemType) {
      case 'port':
        this.ports = this.ports.map((port) =>
          port.id === id ? { ...port, ...changes, isEditing: false } : port
        );
        this.store.dispatch(
          MaritimeActions.editPort({ id, changes: { id, ...changes } })
        );
        break;
      case 'ship':
        this.ships = this.ships.map((ship) =>
          ship.id === id ? { ...ship, ...changes } : ship
        );
        this.store.dispatch(
          MaritimeActions.editShip({ id, changes: { id, ...changes } })
        );
        break;
      case 'voyage':
        this.voyages = this.voyages.map((voyage) =>
          voyage.id === id ? { ...voyage, ...changes } : voyage
        );
        this.store.dispatch(
          MaritimeActions.editVoyage({ id, changes: { id, ...changes } })
        );
        break;
    }
  }

  async onDeleteItem(itemType: string, id: number): Promise<void> {
    let itemDetails: string = '';

    switch (itemType) {
      case 'voyage':
        const voyage = this.voyages.find((v) => v.id === id);
        itemDetails = voyage
          ? `Voyage #${voyage.id} (from ${voyage.departurePort?.name} to ${voyage.arrivalPort?.name} on ${new Date(voyage.voyageDate).toLocaleDateString()})`
          : `Voyage #${id}`;
        break;
      case 'ship':
        const ship = this.ships.find((s) => s.id === id);
        itemDetails = ship ? `Ship #${ship.id} (${ship.name}, ${ship.maxSpeed}kts)` : `Ship #${id}`;
        break;
      case 'port':
        const port = this.ports.find((p) => p.id === id);
        itemDetails = port
          ? `Port #${port.id} (${port.name} of ${port.country})`
          : `Port #${id}`;
        break;
    }

    const confirmed = await this.confirmationService.openModal(
      'Delete Confirmation',
      'Are you sure you want to delete',
      itemDetails
    );

    if (confirmed) {
      switch (itemType) {
        case 'voyage':
          this.voyages = this.voyages.filter((v) => v.id !== id);
          this.store.dispatch(MaritimeActions.deleteVoyage({ id }));
          break;
        case 'ship':
          this.ships = this.ships.filter((s) => s.id !== id);
          this.store.dispatch(MaritimeActions.deleteShip({ id }));
          break;
        case 'port':
          this.ports = this.ports.filter((p) => p.id !== id);
          this.store.dispatch(MaritimeActions.deletePort({ id }));
          break;
      }
    }
  }

  showDeleteModal(itemType: string, id: number): void {
    this.modalItemType = itemType;
    this.modalItemId = id;
    this.isModalVisible = true;
  }

  handleModalConfirm(): void {
    if (this.modalItemId !== null) {
      this.onDeleteItem(this.modalItemType, this.modalItemId);
    }
    this.isModalVisible = false;
  }

  handleModalCancel(): void {
    this.isModalVisible = false;
  }

  showPopup(): void {
    this.isPopupVisible = true;
  }

  hidePopup(): void {
    this.isPopupVisible = false;
  }

  handleSavePopup(data: { type: string; data: any }): void {
    this.isPopupVisible = false;

    const { id, isEditing, ...dataWithoutId } = data.data;

    switch (data.type) {
      case 'voyage':
        const formattedVoyage = {
          ...dataWithoutId,
          voyageDate: new Date(dataWithoutId.voyageDate).toISOString(),
          voyageStart: new Date(dataWithoutId.voyageStart).toISOString(),
          voyageEnd: new Date(dataWithoutId.voyageEnd).toISOString(),
          departurePortId: Number(dataWithoutId.departurePortId),
          arrivalPortId: Number(dataWithoutId.arrivalPortId),
        };
        this.store.dispatch(
          MaritimeActions.addVoyage({ voyage: formattedVoyage })
        );
        break;
      case 'ship':
        this.store.dispatch(MaritimeActions.addShip({ ship: dataWithoutId }));
        break;
      case 'port':
        this.store.dispatch(MaritimeActions.addPort({ port: dataWithoutId }));
        break;
    }
    //console.log('Data saved:', data.data);
  }
}

export function getAnimationDelay(index: number, total: number): string {
  const duration = 300;
  const t = index / (total - 1 || 1); // normalized index
  const eased = t;
  const delay = eased * duration;
  return `${delay}ms`;
}
