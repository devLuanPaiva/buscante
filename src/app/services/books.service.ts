import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResultBooks } from '../models/index';
@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private readonly url = environment.apiUrl;
  constructor(private readonly http: HttpClient) {}

  getBooks(value: string): Observable<IResultBooks> {
    const params = new HttpParams().append('q', value);
    return this.http.get<IResultBooks>(this.url, { params });
  }
}
