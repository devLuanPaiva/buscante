import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./screens/list-books/list-books.module').then((m) => m.ListBooksModule)
  }
];
