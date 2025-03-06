import { TestBed } from '@angular/core/testing';
import { BookPreviewService } from './book-preview.service';

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
});
