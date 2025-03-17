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
    path: 'preview',
    loadChildren: () =>
      import('./screens/book-preview/book-preview.component.module').then(
        (m) => m.BookPreviewModule
      ),
    title: 'Preview de Livro',
  },
  {
    path: 'estatisticas',
    loadChildren: () =>
      import('./screens/starts-charts/starts-charts.module').then(
        (m) => m.StartsChartsModule
      ),
    title: 'Estatisticas',
  },
  {
    path: 'contato',
    loadChildren: () =>
      import('./screens/contact/contact.module').then((m) => m.ContactModule),
    title: 'Entre em contato',
  },
  {
    path: '**',
    loadChildren: () =>
      import('./screens/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];
