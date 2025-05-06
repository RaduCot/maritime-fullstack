import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getAnimationDelay } from '../dashboard.component';
import { SvgIconComponent } from '../../app/assets/svgicon.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-voyages-table',
  templateUrl: './voyages.component.html',
  styleUrls: ['../dashboard.component.scss'],
  imports: [CommonModule, SvgIconComponent, FormsModule],
})
export class VoyagesTableComponent implements OnInit {
  @Input() voyages: any[] = [];
  @Input() ports: any[] = [];
  @Input() sortColumn: string | null = null;
  @Input() sortDirection: 'asc' | 'desc' | null = null;

  @Input() onEdit!: (id: number, updatedVoyage: any) => void;
  @Input() onDelete!: (id: number) => void;

  @Input() toggleSort!: (column: string) => void;

  ngOnInit(): void {
    this.voyages = this.voyages.map((voyage) => ({
      ...voyage,
      isEditing: false,
    }));
  }

  getAnimationDelay(index: number, total: number): string {
    return getAnimationDelay(index, total);
  }

  toggleEdit(voyage: any): void {
    voyage.isEditing = !voyage.isEditing;
    if (!voyage.isEditing) {
      this.onEdit(voyage.id, {
        voyageDate: voyage.voyageDate,
        voyageStart: voyage.voyageStart,
        voyageEnd: voyage.voyageEnd,
        departurePortId: voyage.departurePortId,
        arrivalPortId: voyage.arrivalPortId,
      });
    }
  }

  updateVoyageDate(event: Event, voyage: any, field: 'voyageDate' | 'voyageStart' | 'voyageEnd'): void {
    const input = event.target as HTMLInputElement;
    let dateValue = new Date(input.value);
    voyage[field] = dateValue.toISOString();
  }
  
  
}