import { Component, Input, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'md-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('openClose', [
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
    ])
  ]
})
export class SidenavComponent {
  @Input() isOpen: boolean;
  @Input() top: number;

  get style(): { top: string; height: string } {
    return { top: `${this.top}px`, height: `calc(100vh - ${this.top}px` };
  }

  constructor() {}
}
