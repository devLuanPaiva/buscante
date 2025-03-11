import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private searches: Record<string, number> = {};
  private clicks: Record<string, number> = {};
  private categories: Record<string, number> = {};

  constructor() {
    this.loadFromStorage()
  }
  private loadFromStorage() {
    this.searches = JSON.parse(localStorage.getItem('searchStats') ?? '{}');
    this.clicks = JSON.parse(localStorage.getItem('clickStats') ?? '{}');
    this.categories = JSON.parse(localStorage.getItem('categoryStats') ?? '{}');
  }
  private saveToStorage() {
    localStorage.setItem('searchStats', JSON.stringify(this.searches));
    localStorage.setItem('clickStats', JSON.stringify(this.clicks));
    localStorage.setItem('categoryStats', JSON.stringify(this.categories));
  }
  recordSearch(query: string) {
    this.searches[query] = (this.searches[query] || 0) + 1;
    this.saveToStorage();
  }
  recordClick(bookTitle: string) {
    this.clicks[bookTitle] = (this.clicks[bookTitle] || 0) + 1;
    this.saveToStorage();
  }
  recordCategory(categories: string[]) {
    categories.forEach(category => {
      this.categories[category] = (this.categories[category] || 0) + 1;
    });
    this.saveToStorage();
  }
  getSearchStats() {
    return this.searches;
  }

  getClickStats() {
    return this.clicks;
  }

  getCategoryStats() {
    return this.categories;
  }
}
