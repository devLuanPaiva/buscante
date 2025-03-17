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
    expect(component.searchStats[0].value).toBe(4);
    expect(component.searchStats[1].value).toBe(6);


    const chart = fixture.debugElement.query(By.css('ngx-charts-pie-chart'));
    expect(chart).toBeTruthy();
  });

  it('should display book click stats when available', () => {
    mockStatsService.searchStats$ = of([]);
    mockStatsService.clickedBooks$ = of([
      { name: 'Clean Code', value: 5 },
      { name: 'You Don’t Know JS', value: 3 },
    ]);

    fixture.detectChanges();

    expect(component.clickedBooksStats.length).toBe(2);
    expect(component.clickedBooksStats[0].value).toBe(5);
    expect(component.clickedBooksStats[1].value).toBe(3);

    const chart = fixture.debugElement.query(By.css('ngx-charts-pie-chart'));
    expect(chart).toBeTruthy();
  });
  it('should show message when there are no stats', () => {
    mockStatsService.searchStats$ = of([]);
    mockStatsService.clickedBooks$ = of([]);

    fixture.detectChanges();

    const notFoundElement = fixture.debugElement.query(By.css('.images .title'));
    expect(notFoundElement).toBeTruthy();
    expect(notFoundElement.nativeElement.textContent.trim()).toContain('Você não realizou  nenhuma busca  em nossa estante!');
  });
});
