import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../../../services/auth/auth.service';

@Component({
  selector: 'md-logged-layout',
  templateUrl: './logged-layout.component.html',
  styleUrls: ['./logged-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoggedLayoutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
