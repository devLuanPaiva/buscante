import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, finalize, map, Observable, tap } from 'rxjs';
import { IResultBooks, Item } from '../models/index';
@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private readonly url = environment.apiUrl;
  constructor(private readonly http: HttpClient) { }

  getBooks(value: string): Observable<Item[]> {
    const params = new HttpParams().append('q', value);
    return this.http.get<IResultBooks>(this.url, { params }).pipe(
      tap(() => console.log('Requisição iniciada')),
      map(result => result.items ?? []),
      tap(items => console.log(`Livros encontrados: ${items.length}`)),
      catchError(error => {
        console.error('Erro ao buscar livros:', error);
        return [];
      }),
      finalize(() => console.log('Requisição finalizada'))
    );
  }

}
