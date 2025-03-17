import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: ContactComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ContactComponent],
})
export class ContactModule {}
