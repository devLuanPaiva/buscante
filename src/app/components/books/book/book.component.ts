import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ModalBooksComponent } from "../modal-books/modal-books.component";

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, ModalBooksComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent {
  @Input() book: Object = {};
  openModal: boolean = false;
  toggleModal() {
    this.openModal = !this.openModal;
  }
}
