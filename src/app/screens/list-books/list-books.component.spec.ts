import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListBooksComponent } from './list-books.component';
import { BooksService } from '../../services/books.service';
import { of, throwError } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookComponent } from '../../components/books/book/book.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BookVolInfo } from '../../models/class/book-vol-info';
import { mockBooks } from '../../mocks/books.mocks';

describe('ListBookComponent', () => {
  let component: ListBooksComponent;
  let fixture: ComponentFixture<ListBooksComponent>;
  let booksServiceSpy: jasmine.SpyObj<BooksService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('BooksService', ['getBooks']);

    await TestBed.configureTestingModule({
      imports: [
        ListBooksComponent,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        BookComponent,
      ],
      providers: [{ provide: BooksService, useValue: spy }],
    }).compileComponents();

    booksServiceSpy = TestBed.inject(
      BooksService
    ) as jasmine.SpyObj<BooksService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('must call the book service and populate the book list', () => {
    const expectedBooks = mockBooks.map((item) => new BookVolInfo(item));
    booksServiceSpy.getBooks.and.returnValue(of(mockBooks));
    component.inputSearch = 'Angular';
    component.searchBooks(new Event('submit'));

    expect(booksServiceSpy.getBooks).toHaveBeenCalledOnceWith('Angular');
    expect(component.listBooks).toEqual(expectedBooks);
  });
  it('must deal with errors when searching for books', () => {
    spyOn(console, 'error'); 
    booksServiceSpy.getBooks.and.returnValue(
      throwError(() => new Error('Erro na API'))
    );

    component.searchBooks(new Event('submit'));

    expect(booksServiceSpy.getBooks).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      'Erro ao buscar livros:',
      jasmine.any(Error)
    );
  });
});
