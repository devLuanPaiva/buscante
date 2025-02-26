import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBooksComponent } from './modal-books.component';

describe('ModalBooksComponent', () => {
  let component: ModalBooksComponent;
  let fixture: ComponentFixture<ModalBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
