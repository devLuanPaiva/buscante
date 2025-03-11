import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private searchCounts: { [query: string]: number } = {};
  private readonly searchStatsSubject = new BehaviorSubject<
    { name: string; value: number }[]
  >([]);

  searchStats$ = this.searchStatsSubject.asObservable();

  registerSearch(query: string): void {
    if (query) {
      this.searchCounts[query] = (this.searchCounts[query] || 0) + 1;
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    const chartData = Object.entries(this.searchCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    this.searchStatsSubject.next(chartData);
  }
}
