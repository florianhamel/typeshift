import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export const enterAnimation: AnimationTriggerMetadata[] = [
  trigger('enterAnimation', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('150ms', style({ opacity: 1 }))
    ])
  ])
];

export const leaveAnimation: AnimationTriggerMetadata[] = [
  trigger('leaveAnimation', [
    transition(':leave', [
      style({ opacity: 1 }),
      animate('150ms', style({ opacity: 0 }))
    ])
  ])
];

export const visibilityAnimation: AnimationTriggerMetadata[] = [
  trigger('visibilityAnimation', [
    state('invisible', style({ opacity: 0 })),
    state('visible', style({ opacity: 1 })),
    transition('invisible <=> visible', [animate('150ms')])
  ])
];
