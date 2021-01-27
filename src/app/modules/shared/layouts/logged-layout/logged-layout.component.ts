import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';

import { RoleEnum } from '@models/role.enum';
import { NavRoute } from '@models/nav-route.interface';

import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'md-logged-layout',
  templateUrl: './logged-layout.component.html',
  styleUrls: ['./logged-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoggedLayoutComponent {
  @ViewChild('header') header: ElementRef;

  sideNavIsOpen = false;

  routes: NavRoute[] = [
    {
      link: '/starships',
      text: 'NAVES',
      isVisible: true
    },
    {
      link: '/admin',
      text: 'ADMINISTRACIÓN',
      isVisible: this.isAdmin
    }
  ];

  get isAdmin(): boolean {
    return this.authService.userLogged?.role === RoleEnum.ADMIN;
  }

  get heightHeader(): number {
    return this.header?.nativeElement?.offsetHeight || 64;
  }

  constructor(private authService: AuthService, private router: Router) {}

  toggleSideNav(): void {
    this.sideNavIsOpen = !this.sideNavIsOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
