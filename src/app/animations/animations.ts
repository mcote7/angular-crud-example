import { trigger, transition, style, animate, animateChild, query, stagger } from '@angular/animations';


export const fadeIn = trigger('fadeIn', [
    transition(':enter', [
        style({
            opacity: 0
        }),
        animate(192, style({
            opacity: 1
        }))
    ])
]);

// decorate the element that WRAPS the *ngFor element with '@listAnimationWrap' set to variable if list is dynamic 
export const listAnimationWrap = trigger('listAnimationWrap', [
    transition('* => *', [
        query('@listAnimationItem', [
            stagger(162, [
                animateChild()
            ])
        ], { optional: true })
    ])
]);

// decorate the element that is also decorated with the *ngFor with '@listAnimationItem' 
export const listAnimationItem = trigger('listAnimationItem', [
    transition(':enter', [
        style({
            opacity: 0
        }),
        animate(192, style({
            opacity: 1
        }))
    ])
]);
