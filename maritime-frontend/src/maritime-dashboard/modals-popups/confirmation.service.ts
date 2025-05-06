import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  private confirmationSubject = new Subject<boolean>();
  private modalData: { title: string; message: string; data: string } | null = null;

  getConfirmationObservable() {
    return this.confirmationSubject.asObservable();
  }

  openModal(title: string, message: string, data: string): Promise<boolean> {
    this.modalData = { title, message, data };
    return new Promise((resolve) => {
      this.confirmationSubject.subscribe((result) => {
        resolve(result);
        this.modalData = null; // Reset modal data after resolving
      });
    });
  }

  confirm(): void {
    this.confirmationSubject.next(true);
  }

  cancel(): void {
    this.confirmationSubject.next(false);
  }

  getModalData() {
    return this.modalData;
  }
}
