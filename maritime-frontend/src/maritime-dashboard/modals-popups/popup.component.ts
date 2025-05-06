import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'add-popup',
  templateUrl: './popup.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class AddDataPopupComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() ports: { id: number; name: string }[] = []; // Accept ports from the parent component
  @Output() onCancel = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<{ type: string; data: any }>();

  dataTypes: string[] = ['voyage', 'ship', 'port'];
  selectedType: string = 'voyage';
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      voyageDate: ['', Validators.required],
      departurePortId: ['', Validators.required],
      arrivalPortId: ['', Validators.required],
      voyageStart: ['', Validators.required],
      voyageEnd: ['', Validators.required],
      name: ['', Validators.required],
      maxSpeed: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.onTypeChange(this.selectedType);
  }

  onTypeChange(type: string): void {
    this.selectedType = type;
    this.form = this.fb.group({}); // Reset the form completely

    switch (type) {
      case 'voyage':
        this.form.addControl(
          'voyageDate',
          this.fb.control('', Validators.required)
        );
        this.form.addControl(
          'departurePortId',
          this.fb.control('', Validators.required)
        );
        this.form.addControl(
          'arrivalPortId',
          this.fb.control('', Validators.required)
        );
        this.form.addControl(
          'voyageStart',
          this.fb.control('', Validators.required)
        );
        this.form.addControl(
          'voyageEnd',
          this.fb.control('', Validators.required)
        );
        break;
      case 'ship':
        this.form.addControl('name', this.fb.control('', Validators.required));
        this.form.addControl(
          'maxSpeed',
          this.fb.control('', Validators.required)
        );
        break;
      case 'port':
        this.form.addControl('name', this.fb.control('', Validators.required));
        this.form.addControl(
          'country',
          this.fb.control('', Validators.required)
        );
        break;
    }
  }

  handleCancel(): void {
    this.onCancel.emit();
  }

  handleSave(): void {
    if (this.form.valid) {
      this.onSave.emit({ type: this.selectedType, data: this.form.value });
    } else {
      console.error('Form is invalid:', this.form.errors);
    }
  }
}
