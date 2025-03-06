import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalBooksComponent } from './modal-books.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { mockBook } from '../../../mocks/books.mocks';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BookPreviewService } from '../../../services/book-preview.service';
import { Router } from '@angular/router';

describe('ModalBooksComponent', () => {
  let component: ModalBooksComponent;
  let fixture: ComponentFixture<ModalBooksComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let previewServiceSpy: jasmine.SpyObj<BookPreviewService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    previewServiceSpy = jasmine.createSpyObj('BookPreviewService', ['saveBookToSession']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, ModalBooksComponent],
      providers: [
        { provide: Router, useValue: routerSpy }, 
        { provide: BookPreviewService, useValue: previewServiceSpy },
        provideAnimations()
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBooksComponent);
    component = fixture.componentInstance;
    component.book = mockBook;
    fixture.detectChanges();
  });

  it('should display book details when modal is open', () => {
    component.statusModal = true;
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(By.css('.title'));
    expect(titleElement.nativeElement.textContent).toContain(mockBook.title);
  });

  it('should set body overflow to hidden when modal opens', () => {
    component.statusModal = true;
    component.ngOnChanges({ statusModal: { currentValue: true, previousValue: false, firstChange: false, isFirstChange: () => false } });
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should set body overflow to scroll when modal closes', () => {
    component.statusModal = false;
    component.ngOnChanges({ statusModal: { currentValue: false, previousValue: true, firstChange: false, isFirstChange: () => false } });
    expect(document.body.style.overflow).toBe('scroll');
  });

  it('should navigate to preview page when readPreview is called', () => {
    component.readPreview();
    expect(previewServiceSpy.saveBookToSession).toHaveBeenCalledWith(mockBook);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/preview']);
  });
});
