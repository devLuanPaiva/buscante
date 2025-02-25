import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { IBook } from '../../models';
import { Subscription } from 'rxjs';
import { BookComponent } from '../../components/books/book/book.component';
import { BooksService } from '../../services/books.service';
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
  subscription?: Subscription;
  book: IBook = {}

  constructor(private readonly booksService: BooksService) { }

  searchBooks(event: Event) {
    event.preventDefault(); 
    console.log('Chamou searchBooks com:', this.inputSearch);
    this.subscription = this.booksService.getBooks(this.inputSearch).subscribe({
      next: (books) => (this.listBooks = this.fetchBooks(books)),
      error: (error) => console.error('Erro ao buscar livros:', error),
      complete: () => console.info('Livros carregados!'),
    });
  }

  fetchBooks(items: any): IBook[] {
    const books: IBook[] = [];
    items.forEach((item: any) => {
      books.push({
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        publisher: item.volumeInfo.publisher,
        publishedDate: item.volumeInfo.publishedDate,
        description: item.volumeInfo.description,
        previewLink: item.volumeInfo.previewLink,
        thumbnail: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null,
      });
    })
    return books;
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
