import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IBook } from '../../../models';
import { ModalBooksComponent } from '../modal-books/modal-books.component';
import { AuthorsPipe } from '../../../pipes/authors.pipe';
import { fadeInTrigger } from '../../../animations';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, ModalBooksComponent, AuthorsPipe],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
  animations: [fadeInTrigger]
})
export class BookComponent {
  @Input() book!: IBook
  openModal: boolean = false;
  
  toggleModal() {
    this.openModal = !this.openModal;
  }
}
