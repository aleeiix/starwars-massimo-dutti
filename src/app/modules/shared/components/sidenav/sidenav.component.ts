import { Component, Input } from '@angular/core';

import { sidenavAnimation } from '@utils/animations';

@Component({
  selector: 'md-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [sidenavAnimation]
})
export class SidenavComponent {
  @Input() isOpen: boolean;
  @Input() top: number;

  get style(): { top: string; height: string } {
    return { top: `${this.top}px`, height: `calc(100vh - ${this.top}px` };
  }

  constructor() {}
}
