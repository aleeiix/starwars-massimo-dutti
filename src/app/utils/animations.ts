import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const sidenavAnimation = trigger('openClose', [
  state(
    'open',
    style({
      transform: 'translateX(101%)'
    })
  ),
  state(
    'closed',
    style({
      transform: 'translateX(0)'
    })
  ),
  transition('open => closed', [animate('0.3s')]),
  transition('closed => open', [animate('0.3s')])
]);
