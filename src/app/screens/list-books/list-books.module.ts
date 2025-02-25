import { RouterModule, Routes } from "@angular/router";
import { ListBooksComponent } from "./list-books.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: '',
    component: ListBooksComponent
  }
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ListBooksComponent]
})

export class ListBooksModule { }
