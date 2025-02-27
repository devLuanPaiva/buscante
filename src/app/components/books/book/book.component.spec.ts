import { CommonModule } from "@angular/common";
import { By } from "@angular/platform-browser";
import { BookComponent } from "./book.component";
import { mockBook } from "../../../mocks/books.mocks";
import { AuthorsPipe } from "../../../pipes/authors.pipe";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ModalBooksComponent } from "../modal-books/modal-books.component";

describe("BookComponent", () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ModalBooksComponent, AuthorsPipe, BookComponent],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    component.book = mockBook;
    fixture.detectChanges();
  });
  it('should display book title', () => {
    const titleElement = fixture.debugElement.query(By.css('.tittle'));
    expect(titleElement.nativeElement.textContent).toContain(mockBook?.title?.slice(0, 30));
  });

  it('should toggle modal on button click', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(component.openModal).toBeFalse();
    button.nativeElement.click();
    fixture.detectChanges();
    expect(component.openModal).toBeTrue();
    button.nativeElement.click();
    fixture.detectChanges();
    expect(component.openModal).toBeFalse();
  });
  it('should show modal when openModal is true', () => {
    component.openModal = true;
    fixture.detectChanges();
    const modal = fixture.debugElement.query(By.css('app-modal-books'));
    expect(modal).toBeTruthy();
  });
  it('should display the first author', () => {
    const authorsElement = fixture.debugElement.query(By.css('.result'));
    expect(authorsElement.nativeElement.textContent).toContain(mockBook?.authors?.[0]);
  });

})
