import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResultBooks } from '../models/index';
@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private readonly url = environment.API_URL;
  constructor(private readonly http: HttpClient) { }

  getBooks(value: string, startIndex: number = 0, maxResults: number = 10): Observable<IResultBooks> {
    let params = new HttpParams()
      .set('q', value)
      .set('startIndex', startIndex)
      .set('maxResults', maxResults);

    return this.http.get<IResultBooks>(this.url, { params });
  }
}
