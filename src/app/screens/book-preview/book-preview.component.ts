import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { BookPreviewService } from '../../services/book-preview.service';
import { IBook } from '../../models';

@Component({
  selector: 'app-book-preview',
  templateUrl: './book-preview.component.html',
  styleUrl: './book-preview.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('500ms ease-in-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class BookPreviewComponent implements OnInit {
  book!: Partial<IBook>;
  preview = '';
  animatedText = '';

  constructor(private readonly previewService: BookPreviewService) { }

  ngOnInit(): void {
    const storedBook = this.previewService.getBookFromSession();
    if (storedBook) {
      this.book = storedBook;
      this.previewService.generateBookPreview(this.book).subscribe({
        next: (generatedPreview) => {
          this.preview = generatedPreview;
          this.animateText();
        },
        error: (err) => console.error('Erro ao gerar preview:', err),
      });
    }
  }

  animateText() {
    this.animatedText = '';
    let i = 0;
    const interval = setInterval(() => {
      this.animatedText += this.preview[i];
      i++;
      if (i === this.preview.length) {
        clearInterval(interval);
      }
    }, 30);
  }
}
