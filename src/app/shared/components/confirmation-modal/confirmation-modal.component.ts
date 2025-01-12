import {Component, EventEmitter, Input, Output} from '@angular/core';
import {utils} from '../../util/utils';

@Component({
  selector: 'confirmation-modal',
  imports: [],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {

  @Output() deleteConfirmed = new EventEmitter<void>();
  @Input() title = '';
  @Input() content = '';
  @Input() yesButtonText = '';
  @Input() noButtonText = '';

  constructor() { }

  confirmDelete(): void {
    this.deleteConfirmed.emit();
    this.closeModal();
  }

  closeModal(): void {
    utils.closeModal('confirmationModal');
  }

}
