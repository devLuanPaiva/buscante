import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListBooksComponent } from './list-books.component';
import { BooksService } from '../../services/books.service';
import { of, throwError } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookComponent } from '../../components/books/book/book.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BookVolInfo } from '../../models/class/book-vol-info';
import { mockBooks } from '../../mocks/books.mocks';
import { IResultBooks } from '../../models';
import { provideAnimations } from '@angular/platform-browser/animations';

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
      providers: [{ provide: BooksService, useValue: spy }, provideAnimations()]
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

  it('should call the book service and update resultBooks on search', () => {
    const expectedResponse: IResultBooks = { items: mockBooks, totalItems: mockBooks.length };
    booksServiceSpy.getBooks.and.returnValue(of(expectedResponse));

    component.searchField.setValue('Angular');
    fixture.detectChanges();

    expect(booksServiceSpy.getBooks).toHaveBeenCalledWith('Angular');
    expect(component.resultBooks).toEqual(expectedResponse);
  });

  it('should update the foundBooks$ observable correctly', (done) => {
    const expectedResponse: IResultBooks = { items: mockBooks, totalItems: mockBooks.length };
    booksServiceSpy.getBooks.and.returnValue(of(expectedResponse));

    component.foundBooks$.subscribe((books) => {
      expect(books).toEqual(mockBooks.map(item => new BookVolInfo(item)));
      done();
    });

    component.searchField.setValue('Angular');
  });

  it('should handle errors when searching for books', (done) => {
    spyOn(console, 'error');
    booksServiceSpy.getBooks.and.returnValue(throwError(() => new Error('Erro na API')));

    component.foundBooks$.subscribe({
      error: (err) => {
        expect(console.error).toHaveBeenCalled();
        expect(component.errorMessage).toBe('Ops, ocorreu um erro. Recarregue a aplicação!');
        done();
      },
    });

    component.searchField.setValue('Angular');
  });
});
