import { animate, state, style, transition, trigger, query, group } from '@angular/animations';

// Component transition animations
export const slideInDownAnimation =
    trigger('routeAnimation', [
        transition('* <=> *', [
            /* order */
            /* 1 */
            query(':enter, :leave', style({ transform: 'translateY(0)' })
                , { optional: true }),
            /* 2 */
            group([  // block executes in parallel
                query(':enter', [
                    style({ transform: 'translateY(100%)' }),
                    animate('0.5s ease-in-out', style({ transform: 'translateY(0%)' }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateY(0%)' }),
                    animate('0.5s ease-in-out', style({ transform: 'translateY(100%)' }))
                ], { optional: true }),
            ])
        ])
    ]);


export const slideRightAnimation =
    trigger('slideRightAnimation', [
        state('*', style({
            transform: 'translateX(0)'
        })),
        transition(':enter', [
            style({
                transform: 'translateX(-100%)'
            }),
            animate('0.3s ease-in')
        ]),
        transition(':leave', [
            animate('0.3s ease-out', style({
                transform: 'translateX(100%)'
            }))
        ])
    ]);

export const slideLeftAnimation =
    trigger('slideLeftAnimation', [
        state('*', style({
            transform: 'translateX(0)'
        })),
        transition(':enter', [
            style({
                transform: 'translateX(100%)'
            }),
            animate('0.3s ease-in')
        ]),
        transition(':leave', [
            animate('0.3s ease-out', style({
                transform: 'translateX(-100%)'
            }))
        ])
    ]);
