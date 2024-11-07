import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { LoggedLayoutComponent } from './logged-layout.component';
import { HeaderComponent } from './../../components/header/header.component';
import { AuthService } from '@services/auth/auth.service';
import { RoleEnum } from '@models/role.enum';

describe('LoggedLayoutComponent', () => {
  let component: LoggedLayoutComponent;
  let fixture: ComponentFixture<LoggedLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoggedLayoutComponent, HeaderComponent],
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should isAdmin true', () => {
    const authService = TestBed.inject(AuthService);

    authService.userLogged = {
      name: 'Test',
      lastname: 'Test',
      email: 'test@email.com',
      role: RoleEnum.ADMIN
    };

    expect(component.isAdmin).toBeTrue();
  });

  it('should isAdmin false because role is client', () => {
    const authService = TestBed.inject(AuthService);

    authService.userLogged = {
      name: 'Test',
      lastname: 'Test',
      email: 'test@email.com',
      role: RoleEnum.CLIENT
    };

    expect(component.isAdmin).toBeFalse();
  });

  it('should isAdmin false because userLogged is null', () => {
    const authService = TestBed.inject(AuthService);

    authService.userLogged = null;

    expect(component.isAdmin).toBeFalse();
  });

  it('should heightHeader by offsetHeight header', () => {
    component.header = { nativeElement: { offsetHeight: 100 } };

    expect(component.heightHeader).toEqual(100);
  });

  it('should heightHeader by offsetHeight header', () => {
    component.header = { nativeElement: { offsetHeight: 100 } };

    expect(component.heightHeader).toEqual(100);
  });

  it('should heightHeader 64 because offsetHeight undefined', () => {
    component.header = { nativeElement: {} };

    expect(component.heightHeader).toEqual(64);
  });

  it('should heightHeader 64 because header is null', () => {
    component.header = null;

    expect(component.heightHeader).toEqual(64);
  });

  it('should toggleSideNav set sideNavIsOpen true', () => {
    component.sideNavIsOpen = false;

    component.toggleSideNav();

    expect(component.sideNavIsOpen).toBeTrue();
  });

  it('should toggleSideNav set sideNavIsOpen false', () => {
    component.sideNavIsOpen = true;

    component.toggleSideNav();

    expect(component.sideNavIsOpen).toBeFalse();
  });

  it('should logout call authservice and navigate to login', () => {
    const authService = TestBed.inject(AuthService);
    const router = TestBed.inject(Router);

    spyOn(authService, 'logout');
    spyOn(router, 'navigate');

    component.logout();

    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
