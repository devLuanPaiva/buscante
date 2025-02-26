import { IBook, IImageLinks, IResultBooks, Item, IVolInfo } from '../models';

export const mockImageLinks: IImageLinks = {
  smallThumbnail: 'http://example.com/smallThumbnail.jpg',
  thumbnail: 'http://example.com/thumbnail.jpg',
  small: 'http://example.com/small.jpg',
  medium: 'http://example.com/medium.jpg',
  large: 'http://example.com/large.jpg',
  extraLarge: 'http://example.com/extraLarge.jpg',
};

export const mockBook: IBook = {
  title: 'Mock Book Title',
  authors: ['Author One', 'Author Two'],
  publisher: 'Mock Publisher',
  publishedDate: '2023-01-01',
  description: 'This is a mock book description.',
  previewLink: 'http://example.com/preview',
  thumbnail: mockImageLinks,
};

export const mockVolInfo: IVolInfo = {
  title: 'Mock Volume Title',
  authors: ['Author One', 'Author Two'],
  publisher: 'Mock Publisher',
  publishedDate: '2023-01-01',
  description: 'This is a mock volume description.',
  pageCount: 350,
  printType: 'BOOK',
  mainCategory: 'Fiction',
  categories: ['Fiction', 'Mystery'],
  averageRating: 4.5,
  ratingsCount: 120,
  contentVersion: '1.0.0',
  imageLinks: mockImageLinks,
  language: 'en',
  infoLink: 'http://example.com/info',
  canonicalVolumeLink: 'http://example.com/canonical',
};

export const mockItem: Item = {
  volumeInfo: mockVolInfo,
};

export const mockResultBooks: IResultBooks = {
  items: [mockItem, mockItem],
  totalItems: 2,
};
