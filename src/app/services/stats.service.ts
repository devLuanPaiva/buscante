import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private searchCounts: { [query: string]: number } = {};
  private readonly searchStatsSubject = new BehaviorSubject<{ name: string; value: number }[]>([]);
  searchStats$ = this.searchStatsSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  registerSearch(query: string): void {
    if (query) {
      this.searchCounts[query] = (this.searchCounts[query] || 0) + 1;
      this.updateChartData();
      this.saveToLocalStorage()
    }
  }

  private updateChartData(): void {
    const chartData = Object.entries(this.searchCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);

    this.searchStatsSubject.next(chartData);
  }

  private saveToLocalStorage(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('searchStats', JSON.stringify(this.searchCounts));
  }


  private loadFromLocalStorage(): void {
    if (typeof window === 'undefined') return;
    const savedData = localStorage.getItem('searchStats');
    this.searchCounts = savedData ? JSON.parse(savedData) : {};
    this.updateChartData();
  }

}
