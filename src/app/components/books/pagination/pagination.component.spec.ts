import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { PaginationComponent } from './pagination.component';
import { CommonModule } from '@angular/common';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent, CommonModule]
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
});
