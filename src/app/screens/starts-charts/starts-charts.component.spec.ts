import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartsChartsComponent } from './starts-charts.component';
import { StatsService } from '../../services/stats.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('StartsChartsComponent', () => {
  let component: StartsChartsComponent;
  let fixture: ComponentFixture<StartsChartsComponent>;
  let mockStatsService: jasmine.SpyObj<StatsService>;

  beforeEach(async () => {
    mockStatsService = jasmine.createSpyObj('StatsService', ['searchStats$', 'clickedBooks$']);

    await TestBed.configureTestingModule({
      imports: [NgxChartsModule, StartsChartsComponent],
      providers: [{ provide: StatsService, useValue: mockStatsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(StartsChartsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display search stats when available', () => {
    mockStatsService.searchStats$ = of([
      { name: 'angular', value: 4 },
      { name: 'rxjs', value: 6 },
    ]);
    mockStatsService.clickedBooks$ = of([]);

    fixture.detectChanges();

    expect(component.searchStats.length).toBe(2);
    expect(component.searchStats[0].value).toBe(2);
    expect(component.searchStats[1].value).toBe(3);

    const chart = fixture.debugElement.query(By.css('ngx-charts-pie-chart'));
    expect(chart).toBeTruthy();
  });
});
