import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalBooksComponent } from './modal-books.component';
import { CommonModule, DOCUMENT } from '@angular/common';
import { IBook } from '../../../models';
import { By } from '@angular/platform-browser';
import { mockBook } from '../../../mocks/books.mocks';
import { EventEmitter } from '@angular/core';

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

})
