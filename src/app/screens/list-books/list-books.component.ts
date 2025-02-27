import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { IBook, Item } from '../../models';
import { Subscription } from 'rxjs';
import { BookComponent } from '../../components/books/book/book.component';
import { BooksService } from '../../services/books.service';
import { BookVolInfo } from '../../models/class/book-vol-info';
@Component({
  selector: 'app-list-books',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BookComponent,
    FontAwesomeModule,
  ],
  templateUrl: './list-books.component.html',
  styleUrl: './list-books.component.css',
})
export class ListBooksComponent implements OnDestroy {
  listBooks: IBook[] = [];
  inputSearch: string = '';
  faMagnifyingGlass = faMagnifyingGlass;
  subscription: Subscription = new Subscription();
  book: IBook = {};

  constructor(private readonly booksService: BooksService) {}

  searchBooks(event: Event) {
    event.preventDefault();
    this.subscription = this.booksService.getBooks(this.inputSearch).subscribe({
      next: (books) => (this.listBooks = this.fetchBooks(books)),
      error: (error) => console.error('Erro ao buscar livros:', error),
      complete: () => console.info('Livros carregados!'),
    });
  }

  fetchBooks(items: Item[]): BookVolInfo[] {
    return items.map((item) => {
      return new BookVolInfo(item);
    });
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
