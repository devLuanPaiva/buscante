import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StatsService } from '../../services/stats.service';
@Component({
  selector: 'app-starts-charts',
  imports: [BrowserModule, NgxChartsModule],
  templateUrl: './starts-charts.component.html',
  styleUrl: './starts-charts.component.css'
})
export class StartsChartsComponent implements OnInit {
  searchData: string[] = []
  categoryData: string[] = []
  constructor(private readonly statsService: StatsService) { }

  ngOnInit() {
    this.updateCharts();
  }
  updateCharts() {
    this.searchData = this.formatChartData(this.statsService.getSearchStats());
    this.categoryData = this.formatChartData(this.statsService.getCategoryStats());
  }

  private formatChartData(data: Record<string, number>): any[] {
    return Object.entries(data).map(([name, value]) => ({ name, value }));
  }
}


