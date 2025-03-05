import { Component, OnInit } from '@angular/core';
import { BookPreviewService } from '../../services/book-preview.service';
import { IBook } from '../../models';

@Component({
  selector: 'app-book-preview',
  imports: [],
  templateUrl: './book-preview.component.html',
  styleUrl: './book-preview.component.css'
})
export class BookPreviewComponent implements OnInit {
  book!: Partial<IBook>
  preview = ''
  constructor(private readonly previewService: BookPreviewService) { }

  ngOnInit(): void {
    const storedBook = this.previewService.getBookFromSession();
    if (storedBook) {
      this.book = storedBook;
      this.previewService.generateBookPreview(this.book).subscribe({
        next: (generatedPreview) => (this.preview = generatedPreview),
        error: (err) => console.error('Erro ao gerar preview:', err),
      });
    }
  }
}
