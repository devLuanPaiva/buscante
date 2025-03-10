import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { PaginationComponent } from './pagination.component';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent, CommonModule],
      providers: [provideAnimations()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should calculate totalPages correctly', () => {
    component.totalItems = 100;
    component.itemsPerPage = 10;
    expect(component.totalPages).toBe(10);

    component.totalItems = 95;
    component.itemsPerPage = 10;
    expect(component.totalPages).toBe(10);

    component.totalItems = 101;
    component.itemsPerPage = 10;
    expect(component.totalPages).toBe(11);
  });
  it('should generate pages array correctly for small number of pages', () => {
    component.totalItems = 30;
    component.itemsPerPage = 10;
    component.currentPage = 1;
    fixture.detectChanges();

    expect(component.pages).toEqual([1, 2, 3]);
  });
});
