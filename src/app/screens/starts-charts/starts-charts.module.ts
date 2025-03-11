import { RouterModule, Routes } from '@angular/router';
import { StartsChartsComponent } from './starts-charts.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: StartsChartsComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), StartsChartsComponent],
})
export class StartsChartsModule {}
