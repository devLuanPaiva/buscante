import { IImageLinks } from './IImageLinks.interface';

export interface IBook {
  title?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  previewLink?: string;
  thumbnail?: IImageLinks;
}
