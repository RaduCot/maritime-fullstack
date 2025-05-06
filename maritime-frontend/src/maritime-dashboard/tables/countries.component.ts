import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getAnimationDelay } from '../dashboard.component';

@Component({
  selector: 'app-countries-table',
  templateUrl: './countries.component.html',
  styleUrls: ['../dashboard.component.scss'],
  imports: [CommonModule],
})
export class CountriesTableComponent {
  @Input() countries: any[] = [];
  @Input() sortColumn: string | null = null;
  @Input() sortDirection: 'asc' | 'desc' | null = null;

  @Input() toggleSort!: (column: string) => void;

  getAnimationDelay(index: number, total: number): string {
    return getAnimationDelay(index, total);
  }
}
