import { TestBed } from '@angular/core/testing';

import { MaritimeDataService } from './data.service';

describe('MaritimeDataService', () => {
  let service: MaritimeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaritimeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
