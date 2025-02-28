import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Input, Output, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { IBook } from '../../../models';

@Component({
  selector: 'app-modal-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-books.component.html',
  styleUrl: './modal-books.component.css'
})
export class ModalBooksComponent implements OnChanges {
  @Input() book: IBook = {};
  @Input() statusModal: boolean = false;
  @Output() changedModal = new EventEmitter<boolean>();

  constructor(@Inject(DOCUMENT) private readonly document: Document) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['statusModal'] && this.statusModal) {
      this.document.body.style.overflow = 'hidden';
    } else {
      this.document.body.style.overflow = 'scroll';
    }
  }

  closeModal() {
    this.changedModal.emit(false);
    this.document.body.style.overflow = 'scroll';
  }

  readPreview() {
    window.open('_blank');
  }
}
