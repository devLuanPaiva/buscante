import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./screens/list-books/list-books.module').then(
        (m) => m.ListBooksModule
      ),
    pathMatch: 'full',
  },
  {
    path: '**',
    loadChildren: () =>
      import('./screens/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
  {
    path: 'preview',
    loadChildren: () =>
      import('./screens/book-preview/book-preview.component.module').then(
        (m) => m.BookPreviewModule
      ),
  },
  {
    path: 'estatisticas',
    loadChildren: () =>
      import('./screens/starts-charts/starts-charts.module').then(
        (m) => m.StartsChartsModule
      ),
  },
  {
    path: 'contato',
    loadChildren: () =>
      import('./screens/contact/contact.module').then((m) => m.ContactModule),
  },
];
