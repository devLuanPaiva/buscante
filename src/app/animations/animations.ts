import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInTrigger = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms ease-out', style({ opacity: 1 })),
  ]),
]);