import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookPreviewComponent } from './book-preview.component';
import { BookPreviewService } from '../../services/book-preview.service';
import { of, throwError } from 'rxjs';
import { IBook } from '../../models';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('BookPreviewComponent', () => {
  let component: BookPreviewComponent;
  let fixture: ComponentFixture<BookPreviewComponent>;
  let bookPreviewServiceSpy: jasmine.SpyObj<BookPreviewService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('BookPreviewService', ['getBookFromSession', 'generateBookPreview']);

    await TestBed.configureTestingModule({
      imports: [BookPreviewComponent],
      providers: [{ provide: BookPreviewService, useValue: spy }, provideAnimations()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BookPreviewComponent);
    component = fixture.componentInstance;
    bookPreviewServiceSpy = TestBed.inject(BookPreviewService) as jasmine.SpyObj<BookPreviewService>;
  });
  it('should retrieve book from session on init and generate preview', () => {
    const mockBook: Partial<IBook> = { title: 'Test Book' };
    const mockPreviewText = 'This is a preview of the book.';
    bookPreviewServiceSpy.getBookFromSession.and.returnValue(of(mockBook));
    bookPreviewServiceSpy.generateBookPreview.and.returnValue(of(mockPreviewText));

    fixture.detectChanges();

    expect(bookPreviewServiceSpy.getBookFromSession).toHaveBeenCalled();
    expect(bookPreviewServiceSpy.generateBookPreview).toHaveBeenCalledWith(mockBook);
    expect(component.book).toEqual(mockBook);
  });
  it('should handle error when generating book preview', () => {
    const mockBook: Partial<IBook> = { title: 'Test Book' };
    bookPreviewServiceSpy.getBookFromSession.and.returnValue(of(mockBook));
    bookPreviewServiceSpy.generateBookPreview.and.returnValue(throwError(() => new Error('Erro ao gerar preview')));

    spyOn(console, 'error');

    fixture.detectChanges();

    expect(console.error).toHaveBeenCalledWith('Erro ao gerar preview:', jasmine.any(Error));
  });
  it('should correctly animate typing effect', (done) => {
    component.startTypingEffect('Test');
    expect(component.preview).toBe('Test');
    expect(component.displayedText).toBe('');

    setTimeout(() => {
      expect(component.displayedText).toBe('Test');
      done();
    }, component.typingSpeed * 4);
  });
})
