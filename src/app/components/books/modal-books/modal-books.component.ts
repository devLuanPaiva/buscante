import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
const body = document.querySelector('body');
@Component({
    selector: 'app-modal-books',
    imports: [CommonModule],
    templateUrl: './modal-books.component.html',
    styleUrl: './modal-books.component.css'
})
export class ModalBooksComponent {
  @Input() book: Object = '';
  statusModal: boolean = false;
  @Output() changedModal = new EventEmitter();
  closeModal() {
    this.statusModal = false;
    this.changedModal.emit(this.statusModal);
    body!.style.overflow = 'scroll';
  }
  hiddenModal() {
    if (this.statusModal === true) {
      body!.style.overflow = 'hidden';
    }
  }
  readPreview() {
    window.open('_blank');
  }
}
