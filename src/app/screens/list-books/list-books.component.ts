import { Item } from '../../models';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { BooksService } from '../../services/books.service';
import { BookVolInfo } from '../../models/class/book-vol-info';
import { BookComponent } from '../../components/books/book/book.component';
import { IResultBooks } from './../../models/interfaces/IVolInfo.interface';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { catchError, debounceTime, filter, map, switchMap, tap } from 'rxjs';
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
export class ListBooksComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  searchField = new FormControl()
  errorMessage = ''
  resultBooks: IResultBooks | undefined

  constructor(private readonly booksService: BooksService) { }

  foundBooks$ = this.searchField.valueChanges.pipe(
    debounceTime(300),
    filter(value => value.length >= 3),
    tap(() => console.info('Iniciando busca...')),
    switchMap(value => this.booksService.getBooks(value).pipe(
      tap(result => console.log('Resposta da API:', result)),
      map((result: any) => {
        console.log('Tentando acessar items:', result);
        return result?.items ?? [];
      }),

      map(books => this.onResultBooks(books)),
      tap(books => console.log('Livros transformados:', books)),
      catchError(error => {
        console.log('Erro:', error);
        this.errorMessage = 'Ops, ocorreu um erro. Recarregue a aplicação!';
        return [];
      })
    ))
  );


  onResultBooks(items: Item[]): BookVolInfo[] {
    console.log('Itens recebidos:', items);
    return items.map((item) => new BookVolInfo(item));
  }
}
