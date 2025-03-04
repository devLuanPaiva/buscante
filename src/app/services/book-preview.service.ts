import { Injectable } from '@angular/core';
import { IBook } from '../models';
import { environment } from '../../environments/environment';
import { catchError, map, Observable, throwError, from } from 'rxjs';
import {
  GoogleGenerativeAI
} from '@google/generative-ai';

@Injectable({
  providedIn: 'root',
})
export class BookPreviewService {
  private readonly apiKey = environment.gemini_api_key;
  constructor() {}

  generateBookPreview(book: Partial<IBook>): Observable<string> {
    if (!book.authors || !book.title) {
      return throwError(() => new Error('Autor ou título do livro ausente.'));
    }

    const prompt = `Em português, crie com exatos 600 caracteres um preview interessante sobre o livro ${book.title}, dos autores ${book.authors}.`;

    const genAI = new GoogleGenerativeAI(this.apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    return from(
      model.generateContent(prompt).then((response) => {
        return response.response.text();
      })
    ).pipe(
      map((preview) => preview.trim()),
      catchError((error) => {
        console.error('Erro ao gerar preview:', error);
        return throwError(() => new Error('Falha ao gerar preview do livro.'));
      })
    );
  }
}
