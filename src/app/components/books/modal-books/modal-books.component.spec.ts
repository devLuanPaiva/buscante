import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalBooksComponent } from './modal-books.component';
import { CommonModule, DOCUMENT } from '@angular/common';
import { By } from '@angular/platform-browser';
import { mockBook } from '../../../mocks/books.mocks';

describe('ModalBooksComponent', () => {
  let component: ModalBooksComponent;
  let fixture: ComponentFixture<ModalBooksComponent>;
  let documentSpy: jasmine.SpyObj<Document>;

  beforeEach(async () => {
    documentSpy = jasmine.createSpyObj('Document', ['body']);
    await TestBed.configureTestingModule({
      imports: [CommonModule, ModalBooksComponent],
      providers: [{ provide: DOCUMENT, useValue: document }],
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
})
