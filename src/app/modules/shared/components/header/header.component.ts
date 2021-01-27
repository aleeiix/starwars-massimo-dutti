import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { NavRoute } from '@models/nav-route.interface';

@Component({
  selector: 'md-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() routes: NavRoute[];
  @Input() sideNavIsOpen: boolean;

  @Output() logout: EventEmitter<void> = new EventEmitter();
  @Output() toggleSideNav: EventEmitter<void> = new EventEmitter();

  constructor() {}

  toggleSideNavEmit(): void {
    this.toggleSideNav.emit();
  }

  logoutEmit(): void {
    this.logout.emit();
  }
}
