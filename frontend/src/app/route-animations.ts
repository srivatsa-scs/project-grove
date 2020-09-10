import { trigger, transition, style, query, group, animateChild, animate, keyframes } from '@angular/animations';

const optional = { optional: true };

export const fader = trigger('routeAnimations', [
  transition('* <=> *', [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
          transition: 'all cubic-bezier(0.250, 0.460, 0.450, 0.940)',
        }),
      ],
      optional
    ),
    group([
      query(
        ':enter',
        [
          animate(
            '600ms ease',
            style({
              opacity: 1,
              transition: 'all cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            })
          ),
        ],
        optional
      ),
    ]),
  ]),
]);

export const slider = trigger('routeAnimations', [
  transition('* => isLeft', slideTo('left')),
  transition('* => isRight', slideTo('right')),
  transition('isRight => *', slideTo('left')),
  transition('isLeft => *', slideTo('right')),
]);

function slideTo(direction) {
  return [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          [direction]: 0,
          width: '100%',
        }),
      ],
      optional
    ),
    query(':enter', [style({ [direction]: '-100%' })]),
    group([query(':leave', [animate('600ms ease', style({ [direction]: '100%' }))], optional), query(':enter', [animate('600ms ease', style({ [direction]: '0%' }))])]),
  ];
}
