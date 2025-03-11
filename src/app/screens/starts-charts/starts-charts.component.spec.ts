import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartsChartsComponent } from './starts-charts.component';

describe('StartsChartsComponent', () => {
  let component: StartsChartsComponent;
  let fixture: ComponentFixture<StartsChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartsChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartsChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
