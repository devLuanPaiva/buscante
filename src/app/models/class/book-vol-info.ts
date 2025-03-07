import { IBook } from '../interfaces/IBook.interface';
import { IImageLinks } from '../interfaces/IImageLinks.interface';

export class BookVolInfo implements IBook {
  title?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  previewLink?: string;
  thumbnail?: IImageLinks;

  constructor(item: any) {
    this.title = item.volumeInfo?.title;
    this.authors = item.volumeInfo?.authors;
    this.publisher = item.volumeInfo?.publisher;
    this.publishedDate = item.volumeInfo?.publishedDate
    this.description = item.volumeInfo?.description;
    this.previewLink = item.volumeInfo?.previewLink;
    this.thumbnail = item.volumeInfo?.imageLinks ?? {
      smallThumbnail: '/assets/images/capa-indisponivel.png',
      thumbnail: '/assets/images/capa-indisponivel.png',
      small: '',
      medium: '',
      large: '',
      extraLarge: ''
    };
  }
}
