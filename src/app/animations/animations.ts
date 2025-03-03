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
  state('void', style({ opacity: 0, transform: 'translate(-50%, -48%) scale(0.9) rotateX(-10deg)' })),
  state('*', style({ opacity: 1, transform: 'translate(-50%, -50%) scale(1) rotateX(0)' })),
  transition('void => *', animate('500ms cubic-bezier(0.23, 1, 0.32, 1)')),
  transition('* => void', animate('300ms ease-in-out', style({ opacity: 0, transform: 'translate(-50%, -52%) scale(0.9) rotateX(10deg)' })))
]);

export const overlayAnimationTrigger = trigger('overlayAnimation', [
  state('void', style({ opacity: 0, backdropFilter: 'blur(0px)' })),
  state('*', style({ opacity: 1, backdropFilter: 'blur(8px)' })),
  transition('void <=> *', animate('500ms ease'))
]);

