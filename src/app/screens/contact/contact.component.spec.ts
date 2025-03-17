import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ContactComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('must initialize the form correctly', () => {
    expect(component.contactForm).toBeDefined();
    expect(component.contactForm.controls['name']).toBeDefined();
    expect(component.contactForm.controls['email']).toBeDefined();
    expect(component.contactForm.controls['phone']).toBeDefined();
    expect(component.contactForm.controls['message']).toBeDefined();
    expect(component.contactForm.controls['reasonForContact']).toBeDefined();
    expect(component.contactForm.controls['bestWayToContact']).toBeDefined();
  });
  it('must validate the form correctly', () => {
    component.contactForm.setValue({
      name: '',
      email: '',
      phone: '',
      message: '',
      reasonForContact: '',
      bestWayToContact: 'email',
    });
    expect(component.contactForm.valid).toBeFalse();
  });
  it('must navigate to home page when canceling', () => {
    component.goToHome();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
  it('should disable submit button if form is invalid', () => {
    component.contactForm.setValue({
      name: '',
      email: '',
      phone: '',
      message: '',
      reasonForContact: '',
      bestWayToContact: 'email',
    });
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.send-button'));
    expect(button.nativeElement.getAttribute('aria-disabled')).toBe('true');
  });
  it('must accept valid values', async () => {
    component.contactForm.setValue({
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '11987654321',
      message: 'Olá, preciso de ajuda.',
      reasonForContact: 'support',
      bestWayToContact: 'email',
    });

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.contactForm.valid).toBeTrue();
  });
  it('must reset the form when submitting', async () => {
    spyOn(component.contactForm, 'reset');

    component.contactForm.setValue({
      name: 'Maria',
      email: 'maria@email.com',
      phone: '11987654321',
      message: 'Ajuda',
      reasonForContact: 'support',
      bestWayToContact: 'phone',
    });

    fixture.detectChanges();
    await fixture.whenStable();

    component.onSubmit();
    expect(component.contactForm.reset).toHaveBeenCalled();
  });
});
