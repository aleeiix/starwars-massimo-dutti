import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleEnum } from '@models/role.enum';

import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'md-logged-layout',
  templateUrl: './logged-layout.component.html',
  styleUrls: ['./logged-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoggedLayoutComponent implements OnInit {
  get isAdmin(): boolean {
    return this.authService.userLogged?.role === RoleEnum.ADMIN;
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
