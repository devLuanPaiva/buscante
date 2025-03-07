import { TestBed } from '@angular/core/testing';
import { BookPreviewService } from './book-preview.service';
import { IBook } from '../models';

describe('BookPreviewService', () => {
  let service: BookPreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookPreviewService);

    spyOn(sessionStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'bookPreview') {
        return JSON.stringify({ title: 'Test Book', authors: ['Author'] });
      }
      return null;
    });

    spyOn(sessionStorage, 'setItem').and.callFake(() => { });
    spyOn(sessionStorage, 'removeItem').and.callFake(() => { });
    spyOn(sessionStorage, 'clear').and.callFake(() => { });
  });

  it('should throw an error if book has no title or authors', (done) => {
    service.generateBookPreview({ title: 'Test Book' }).subscribe({
      error: (err) => {
        expect(err.message).toBe('Autor ou título do livro ausente.');
        done();
      },
    });
  });
  it('should save book to sessionStorage', () => {
    const book: Partial<IBook> = { title: 'Sample Book', authors: ['Sample Author'] };
    service.saveBookToSession(book);
    expect(sessionStorage.setItem).toHaveBeenCalledWith('bookPreview', JSON.stringify(book));
  });
  it('should throw an error when saving a book with missing title or authors', () => {
    expect(() => service.saveBookToSession({ title: 'No Author' })).toThrowError('Autor ou título do livro ausente.');
  });
  it('should retrieve book from sessionStorage', (done) => {
    service.getBookFromSession().subscribe((book) => {
      expect(book).toEqual({ title: 'Test Book', authors: ['Author'] });
      done();
    });
  });
  it('should return null if no book is in sessionStorage', (done) => {
    (sessionStorage.getItem as jasmine.Spy).and.returnValue(null);
    service.getBookFromSession().subscribe((book) => {
      expect(book).toBeNull();
      done();
    });
  });
});
