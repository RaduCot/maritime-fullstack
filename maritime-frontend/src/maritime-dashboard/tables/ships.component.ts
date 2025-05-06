import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getAnimationDelay } from '../dashboard.component';
import { SvgIconComponent } from '../../app/assets/svgicon.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ships-table',
  templateUrl: './ships.component.html',
  styleUrls: ['../dashboard.component.scss'],
  imports: [CommonModule, SvgIconComponent, FormsModule],
})
export class ShipsTableComponent implements OnInit {
  @Input() ships: any[] = [];
  @Input() sortColumn: string | null = null;
  @Input() sortDirection: 'asc' | 'desc' | null = null;

  @Input() onEdit!: (id: number, updatedShip: any) => void;
  @Input() onDelete!: (id: number) => void;

  @Input() toggleSort!: (column: string) => void;

  ngOnInit(): void {
    this.ships = this.ships.map((ship) => ({
      ...ship,
      isEditing: false,
    }));
  }

  getAnimationDelay(index: number, total: number): string {
    return getAnimationDelay(index, total);
  }

  toggleEdit(ship: any): void {
    ship.isEditing = !ship.isEditing;
    if (!ship.isEditing) {
      this.onEdit(ship.id, { name: ship.name, maxSpeed: ship.maxSpeed });
    }
  }
}