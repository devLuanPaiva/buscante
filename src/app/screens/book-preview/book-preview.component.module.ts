import { RouterModule, Routes } from "@angular/router";
import { BookPreviewComponent } from "./book-preview.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: '',
    component: BookPreviewComponent
  }
]
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), BookPreviewComponent]
})

export class BookPreviewModule { }
