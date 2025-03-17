import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StatsService } from '../../services/stats.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-starts-charts',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './starts-charts.component.html',
  styleUrl: './starts-charts.component.css',
})
export class StartsChartsComponent implements OnInit {
  searchStats: { name: string; value: number }[] = [];
  clickedBooksStats: { name: string; value: number }[] = [];
  combinedStats: { name: string; value: number }[] = [];
  constructor(private readonly searchStatsService: StatsService) { }

  ngOnInit(): void {
    this.searchStatsService.searchStats$.subscribe(
      (stats) =>(this.searchStats = stats)
    );
    this.searchStatsService.clickedBooks$.subscribe((stats) => (this.clickedBooksStats = stats));
    this.combinedStats = [...this.searchStats, ...this.clickedBooksStats];
  }
}
