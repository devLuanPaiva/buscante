import { Item } from '../../models';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksService } from '../../services/books.service';
import { BookVolInfo } from '../../models/class/book-vol-info';
import { BookComponent } from '../../components/books/book/book.component';
import { IResultBooks } from './../../models/interfaces/IVolInfo.interface';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import {
  fadeInTrigger,
  slideInTrigger,
  listAnimationTrigger,
} from '../../animations';
import { PaginationComponent } from '../../components/books/pagination/pagination.component';
import { StatsService } from '../../services/stats.service';
@Component({
  selector: 'app-list-books',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BookComponent,
    PaginationComponent,
  ],
  templateUrl: './list-books.component.html',
  styleUrl: './list-books.component.css',
  animations: [fadeInTrigger, slideInTrigger, listAnimationTrigger],
})
export class ListBooksComponent implements AfterViewInit {
  searchField = new FormControl();
  errorMessage = '';
  resultBooks: IResultBooks | undefined;
  currentPage = 1;
  itemsPerPage = 10;
  @ViewChild('searchFieldElement') searchFieldElement!: ElementRef;

  constructor(
    private readonly booksService: BooksService,
    private readonly statsService: StatsService
  ) {}
  
  ngAfterViewInit(): void {
    this.searchFieldElement.nativeElement.focus();
  }

  foundBooks$ = this.searchField.valueChanges.pipe(
    debounceTime(300),
    filter((value) => value.length >= 3),
    distinctUntilChanged(),
    switchMap((value) =>
      this.booksService.getBooks(value).pipe(
        tap((results) => {
          this.resultBooks = results;
          this.statsService.registerSearch(value);
        })
      )
    ),
    map((results) => results.items ?? []),
    map((items) => this.onResultBooks(items)),
    catchError((error) => {
      console.error(error);
      this.errorMessage = 'Ops, ocorreu um erro. Recarregue a aplicação!';
      return throwError(() => new Error(this.errorMessage));
    })
  );

  onPageChange(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;

    this.foundBooks$ = this.booksService
      .getBooks(this.searchField.value, startIndex, this.itemsPerPage)
      .pipe(
        tap((results) => {
          this.resultBooks = results;
        }),
        map((results) => results.items ?? []),
        map((items) => this.onResultBooks(items))
      );
  }

  onResultBooks(items: Item[]): BookVolInfo[] {
    return items.map((item) => new BookVolInfo(item));
  }
}
