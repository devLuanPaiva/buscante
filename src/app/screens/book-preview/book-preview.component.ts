import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { BookPreviewService } from '../../services/book-preview.service';
import { IBook } from '../../models';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-book-preview',
  templateUrl: './book-preview.component.html',
  styleUrls: ['./book-preview.component.css'],
  animations: [
    trigger('typing', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden => visible', animate('0.5s ease-in')),
    ]),
  ],
})
export class BookPreviewComponent implements OnInit {
  book!: Partial<IBook>;
  preview = '';
  displayedText = '';
  typingSpeed = 20;
  constructor(private readonly previewService: BookPreviewService) {}

  ngOnInit(): void {
    const storedBook = this.previewService.getBookFromSession();
    if (storedBook) {
      this.book = storedBook;
      this.previewService.generateBookPreview(this.book).subscribe({
        next: (generatedPreview) => this.startTypingEffect(generatedPreview),
        error: (err) => console.error('Erro ao gerar preview:', err),
      });
    }
  }

  startTypingEffect(text: string) {
    this.preview = text;
    this.displayedText = '';
    let i = 0;

    const interval = setInterval(() => {
      if (i < this.preview.length) {
        this.displayedText += this.preview[i];
        i++;
      } else {
        clearInterval(interval);
      }
    }, this.typingSpeed);
  }
}
