import { Item } from '../../models';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksService } from '../../services/books.service';
import { BookVolInfo } from '../../models/class/book-vol-info';
import { BookComponent } from '../../components/books/book/book.component';
import { IResultBooks } from './../../models/interfaces/IVolInfo.interface';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, filter, map, switchMap, tap, throwError } from 'rxjs';
import { fadeInTrigger, slideInTrigger, listAnimationTrigger } from '../../animations';
@Component({
  selector: 'app-list-books',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BookComponent
  ],
  templateUrl: './list-books.component.html',
  styleUrl: './list-books.component.css',
  animations: [fadeInTrigger, slideInTrigger, listAnimationTrigger]
})
export class ListBooksComponent {
  searchField = new FormControl()
  errorMessage = ''
  resultBooks: IResultBooks | undefined

  constructor(private readonly booksService: BooksService) { }

  foundBooks$ = this.searchField.valueChanges.pipe(
    debounceTime(300),
    filter(value => value.length >= 3),
    tap(() => console.info('Iniciando busca...')),
    switchMap((value) => this.booksService.getBooks(value)),
    map((results) => this.resultBooks = results),
    tap(response => console.log(response)),
    map((results => results.items ?? [])),
    map((items) => this.onResultBooks(items)),
    catchError((error) => {
    console.error(error)
      return throwError(() => new Error(this.errorMessage = 'Ops, ocorreu um erro. Recarregue a aplicação!'))
    })
    
  );

  onResultBooks(items: Item[]): BookVolInfo[] {
    return items.map((item) => new BookVolInfo(item));
  }
}
