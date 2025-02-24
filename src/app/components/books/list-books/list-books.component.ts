import { Component, OnDestroy } from '@angular/core';
import { BooksService } from '../../../services/books.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookComponent } from '../book/book.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { IBook } from '../../../models';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-list-books',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, BookComponent, FontAwesomeModule],
  templateUrl: './list-books.component.html',
  styleUrl: './list-books.component.css'
})
export class ListBooksComponent implements OnDestroy {
  listBooks: IBook[] = [];
  inputSearch: string = '';
  faMagnifyingGlass = faMagnifyingGlass;
  subscription!: Subscription;

  constructor(private readonly booksService: BooksService) { }

  searchBooks() {
    this.subscription = this.booksService.getBooks(this.inputSearch).subscribe({
      next: (books) => (this.listBooks = books),
      error: (error) => console.error('Error fetching books:', error),
      complete: () => console.info('Books loaded!'),
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
