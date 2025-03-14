import { CommonModule, DOCUMENT } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  Inject,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { IBook } from '../../../models';
import { modalAnimationTrigger, overlayAnimationTrigger } from '../../../animations';
import { BookPreviewService } from '../../../services/book-preview.service';
import { Router } from '@angular/router';
import { StatsService } from '../../../services/stats.service';

@Component({
  selector: 'app-modal-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-books.component.html',
  styleUrl: './modal-books.component.css',
  animations: [modalAnimationTrigger, overlayAnimationTrigger],
})
export class ModalBooksComponent implements OnChanges {
  @Input() book!: IBook
  @Input() statusModal: boolean = false;
  @Output() changedModal = new EventEmitter<boolean>();

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly previewService: BookPreviewService,
    private readonly statsService: StatsService,
    private readonly router: Router
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['statusModal'] && this.statusModal) {
      this.document.body.style.overflow = 'hidden';
    } else {
      this.document.body.style.overflow = 'scroll';
    }
  }

  closeModal() {
    this.changedModal.emit(false);
    this.document.body.style.overflow = 'scroll';
  }

  readPreview() {
    this.previewService.saveBookToSession(this.book)
    this.statsService.registerBookClick(this.book.title ?? 'Título Desconhecido');
    this.router.navigate(['/preview']);
  }
}
