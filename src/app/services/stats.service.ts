import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private searchCounts: { [query: string]: number } = {};
  private clickedBooks: { [title: string]: number } = {};

  private readonly searchStatsSubject = new BehaviorSubject<{ name: string; value: number }[]>([]);
  private readonly clickedBooksSubject = new BehaviorSubject<{ name: string; value: number }[]>([]);

  searchStats$ = this.searchStatsSubject.asObservable();
  clickedBooks$ = this.clickedBooksSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  registerSearch(query: string): void {
    if (query) {
      const normalizedQuery = query.toLowerCase();
      this.searchCounts[normalizedQuery] = (this.searchCounts[normalizedQuery] || 0) + 1;
      this.updateChartData();
      this.saveToLocalStorage();
    }
  }

  registerBookClick(title: string): void {
    if (title) {
      const normalizedTitle = title.toLowerCase();
      this.clickedBooks[normalizedTitle] = (this.clickedBooks[normalizedTitle] || 0) + 1;
      this.updateClickedBooksChart();
      this.saveToLocalStorage();
    }
  }

  private updateChartData(): void {
    const chartData = Object.entries(this.searchCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);

    this.searchStatsSubject.next(chartData);
  }

  private updateClickedBooksChart(): void {
    const chartData = Object.entries(this.clickedBooks)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);

    this.clickedBooksSubject.next(chartData);
  }

  private saveToLocalStorage(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('searchStats', JSON.stringify(this.searchCounts));
    localStorage.setItem('clickedBooks', JSON.stringify(this.clickedBooks));
  }

  private loadFromLocalStorage(): void {
    if (typeof window === 'undefined') return;
    const savedSearchData = localStorage.getItem('searchStats');
    const savedBookData = localStorage.getItem('clickedBooks');

    this.searchCounts = savedSearchData ? JSON.parse(savedSearchData) : {};
    this.clickedBooks = savedBookData ? JSON.parse(savedBookData) : {};

    this.updateChartData();
    this.updateClickedBooksChart();
  }
}
