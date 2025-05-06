import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getAnimationDelay } from '../dashboard.component';
import { SvgIconComponent } from '../../app/assets/svgicon.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ports-table',
  templateUrl: './ports.component.html',
  styleUrls: ['../dashboard.component.scss'],
  imports: [CommonModule, SvgIconComponent, FormsModule],
})
export class PortsTableComponent implements OnInit {
  @Input() ports: any[] = [];
  @Input() sortColumn: string | null = null;
  @Input() sortDirection: 'asc' | 'desc' | null = null;

  @Input() onEdit!: (id: number, updatedPort: any) => void;
  @Input() onDelete!: (id: number) => void;

  @Input() toggleSort!: (column: string) => void;

  ngOnInit(): void {
    this.ports = this.ports.map((port) => ({
      ...port,
      isEditing: false,
    }));
  }

  getAnimationDelay(index: number, total: number): string {
    return getAnimationDelay(index, total);
  }

  toggleEdit(port: any): void {
    port.isEditing = !port.isEditing;
    if (!port.isEditing) {
      this.onEdit(port.id, { name: port.name, country: port.country });
    }
  }
}