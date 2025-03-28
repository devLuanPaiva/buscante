import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { BooksService } from './books.service';
import { IResultBooks } from '../models';
import { environment } from '../../environments/environment';
import { provideHttpClient } from '@angular/common/http';

describe('BooksService', () => {
  let service: BooksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BooksService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(BooksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch books and return an array of items', () => {
    const mockResponse: IResultBooks = {
      items: [
        {
          volumeInfo: {
            title: 'Book Title',
            authors: ['Author 1'],
            publisher: 'Publisher',
            publishedDate: '2024-01-01',
            description: 'Description',
            pageCount: 300,
            printType: 'BOOK',
            mainCategory: 'Category',
            categories: ['Fiction'],
            averageRating: 4.5,
            ratingsCount: 100,
            contentVersion: '1.0',
            imageLinks: {
              thumbnail: 'http://example.com/image.jpg',
              smallThumbnail: '',
              small: '',
              medium: '',
              large: '',
              extraLarge: ''
            },
            language: 'en',
            infoLink: 'http://example.com',
            canonicalVolumeLink: 'http://example.com/canonical',
          },
        },
      ],
      totalItems: 1,
    };

    const searchQuery = 'Angular';
    const startIndex = 0;
    const maxResults = 10;

    service.getBooks(searchQuery, startIndex, maxResults).subscribe((result: IResultBooks) => {
      expect(result.items.length).toBe(1);
      expect(result.items[0].volumeInfo.title).toBe('Book Title');
    });

    const req = httpMock.expectOne(
      `${environment.API_URL}?q=${searchQuery}&startIndex=${startIndex}&maxResults=${maxResults}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle errors when the request fails', () => {
    const searchQuery = 'Angular';
    const startIndex = 0;
    const maxResults = 10;

    service.getBooks(searchQuery, startIndex, maxResults).subscribe({
      next: () => fail('Expected an error, but got a response'),
      error: (error) => {
        expect(error.status).toBe(500);
      },
    });

    const req = httpMock.expectOne(
      `${environment.API_URL}?q=${searchQuery}&startIndex=${startIndex}&maxResults=${maxResults}`
    );
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });
});
