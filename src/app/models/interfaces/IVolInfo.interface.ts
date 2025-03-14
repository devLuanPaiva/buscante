import { IImageLinks } from './IImageLinks.interface';

export interface IVolInfo {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  pageCount: number;
  printType: string;
  mainCategory: string;
  categories: string[];
  averageRating: number;
  ratingsCount: number;
  contentVersion: string;
  imageLinks: IImageLinks;
  language: string;
  infoLink: string;
  canonicalVolumeLink: string;
}

export interface Item {
  volumeInfo: IVolInfo;
}

export interface IResultBooks {
  items: Item[];
  totalItems: number;
}
