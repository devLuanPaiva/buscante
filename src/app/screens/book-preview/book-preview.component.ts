import { Component, OnInit } from '@angular/core';
import { BookPreviewService } from '../../services/book-preview.service';
import { IBook } from '../../models';
import { typingPreviewTrigger } from '../../animations';


@Component({
  selector: 'app-book-preview',
  templateUrl: './book-preview.component.html',
  styleUrls: ['./book-preview.component.css'],
  animations: [typingPreviewTrigger],
})
export class BookPreviewComponent implements OnInit {
  book!: Partial<IBook>;
  preview = '';
  displayedText = '';
  typingSpeed = 20;
  constructor(private readonly previewService: BookPreviewService) {}

  ngOnInit(): void {
    this.previewService.getBookFromSession().subscribe((storedBook) => {
      if (storedBook) {
        this.book = storedBook;
        this.previewService.generateBookPreview(this.book).subscribe({
          next: (generatedPreview) => this.startTypingEffect(generatedPreview),
          error: (err) => console.error('Erro ao gerar preview:', err),
        });
      }
    });
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
