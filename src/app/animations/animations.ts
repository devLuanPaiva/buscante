import {
  animate,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fadeInTrigger = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms ease-out', style({ opacity: 1 })),
  ]),
]);
export const slideInTrigger = trigger('slideIn', [
  transition(':enter', [
    style({ transform: 'translateY(20px)', opacity: 0 }),
    animate(
      '300ms ease-out',
      style({ transform: 'translateY(0)', opacity: 1 })
    ),
  ]),
]);
export const listAnimationTrigger = trigger('listAnimation', [
  transition(':enter', [
    query('div', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      stagger(
        100,
        animate(
          '400ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ),
    ]),
  ]),
]);
export const modalAnimationTrigger = trigger('modalAnimation', [
  state('open', style({ opacity: 1, transform: 'scale(1)' })),
  state('closed', style({ opacity: 0, transform: 'scale(0.8)' })),
  transition('closed => open', [animate('300ms ease-out')]),
  transition('open => closed', [animate('200ms ease-in')]),
]);
