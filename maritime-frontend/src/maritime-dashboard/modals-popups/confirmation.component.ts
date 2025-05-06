import { Component } from '@angular/core';
import { ConfirmationService } from './confirmation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-modal',
  imports: [CommonModule],
  template: `
    <div
      *ngIf="modalData"
      class="fixed inset-0 bg-black/20 flex items-center justify-center z-50 backdrop-blur-sm"
    >
      <div
        class="bg-gray-900 text-gray-100 rounded-lg shadow-lg p-6 w-96 flex flex-col gap-6 border-1 border-slate-800"
      >
        <h2 class="text-lg text-slate-100 font-bold">{{ modalData.title }}</h2>

        <div class="flex flex-col gap-4">
          <p class="text-sm text-slate-500">
            Are you sure you want to delete this entry?
          </p>
          <span class="text-slate-300 bg-gray-950 text-sm font-mono border-1 border-slate-800 rounded px-3 py-2">{{ modalData.data }}</span>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end gap-4">
          <button
            class="px-4 py-2 text-slate-100 bg-transparent hover:bg-slate-100 hover:text-gray-950 rounded text-sm cursor-pointer border-1 border-slate-800  transition duration-100 ease-out"
            (click)="onCancel()"
          >
            <b>Cancel</b>
          </button>
          <button
            class="px-4 py-2 bg-rose-600 hover:bg-red-800 rounded text-sm cursor-pointer transition duration-100 ease-out"
            (click)="onConfirm()"
          >
            <b>Delete</b>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ConfirmationModalComponent {
  constructor(private confirmationService: ConfirmationService) {}

  get modalData(): { title: string; message: string; data: string } | null {
    return this.confirmationService.getModalData();
  }

  onConfirm(): void {
    this.confirmationService.confirm();
  }

  onCancel(): void {
    this.confirmationService.cancel();
  }
}
