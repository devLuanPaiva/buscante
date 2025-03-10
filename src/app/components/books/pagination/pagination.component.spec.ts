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
  it('should generate pages array correctly when currentPage is near the start', () => {
    component.totalItems = 100;
    component.itemsPerPage = 10;
    component.currentPage = 3;
    fixture.detectChanges();

    expect(component.pages).toEqual([1, 2, 3, 4, 5, -1, 8, 9, 10]);
  });
  it('should generate pages array correctly when currentPage is near the end', () => {
    component.totalItems = 100;
    component.itemsPerPage = 10;
    component.currentPage = 8;
    fixture.detectChanges();

    expect(component.pages).toEqual([1, 2, 3, -1, 6, 7, 8, 9, 10]);
  });
  it('should generate pages array correctly when currentPage is in the middle', () => {
    component.totalItems = 100;
    component.itemsPerPage = 10;
    component.currentPage = 5;
    fixture.detectChanges();

    expect(component.pages).toEqual([1, -1, 3, 4, 5, 6, 7, -1, 10]);
  });
  it('should not emit pageChange event when clicking on the current page or dots', () => {
    spyOn(component.pageChange, 'emit');
    component.totalItems = 100;
    component.itemsPerPage = 10;
    component.currentPage = 1;
    fixture.detectChanges();

    const buttons: DebugElement[] = fixture.debugElement.queryAll(By.css('button'));
    buttons[0].triggerEventHandler('click', null);
    buttons[5].triggerEventHandler('click', null);

    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });
  it('should apply the "active" class to the current page button', () => {
    component.totalItems = 100;
    component.itemsPerPage = 10;
    component.currentPage = 2;
    fixture.detectChanges();

    const buttons: DebugElement[] = fixture.debugElement.queryAll(By.css('button'));
    const activeButton = buttons.find(button => button.nativeElement.classList.contains('active'));

    expect(activeButton).toBeTruthy();
    expect(activeButton?.nativeElement.textContent.trim()).toBe('2');
  });
});
