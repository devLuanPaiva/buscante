import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required, Validators.maxLength(11)],
      message: ['', Validators.required],
      reasonForContact: ['', Validators.required],
      bestWayToContact: ['email', Validators.required],
    });
  }
  onSubmit() {
    if (this.contactForm.valid) {
      this.contactForm.reset();
    }
  }
  goToHome() {
    this.contactForm.reset();
    this.router.navigate(['/']);
  }
}
