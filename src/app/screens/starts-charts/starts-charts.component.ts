import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StatsService } from '../../services/stats.service';
@Component({
  selector: 'app-starts-charts',
  imports: [BrowserModule, NgxChartsModule],
  templateUrl: './starts-charts.component.html',
  styleUrl: './starts-charts.component.css',
})
export class StartsChartsComponent implements OnInit {
  searchStats: { name: string; value: number }[] = [];

  constructor(private readonly searchStatsService: StatsService) {}

  ngOnInit(): void {
    this.searchStatsService.searchStats$.subscribe(
      (stats) => (this.searchStats = stats)
    );
  }
}
