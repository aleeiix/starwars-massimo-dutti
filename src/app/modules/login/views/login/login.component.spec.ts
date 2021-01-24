import { LoginService } from './login.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { LoginFormComponent } from './../../components/login-form/login-form.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, LoginFormComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should instance form', () => {
    const form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    expect(component.loginForm.value).toEqual(form.value);
  });

  it('should login error', () => {
    const error = 'Error Test';

    const service = TestBed.inject(LoginService);

    spyOn(service, 'login').and.returnValue(throwError(error));

    component.loginForm.setValue({
      email: 'test@email.com',
      password: 'Test-1234'
    });

    component.login();

    expect(component.loginError).toEqual(error);
  });

  it('should login succes but response is false', () => {
    const error = 'El correo electrónico y/o contraseña no es correcto.';

    const service = TestBed.inject(LoginService);

    spyOn(service, 'login').and.returnValue(of(false));

    component.loginForm.setValue({
      email: 'test@email.com',
      password: 'Test-1234'
    });

    component.login();

    expect(component.loginError).toEqual(error);
  });

  it('should login succes but response is true', () => {
    const service = TestBed.inject(LoginService);
    const router = TestBed.inject(Router);

    spyOn(service, 'login').and.returnValue(of(true));
    spyOn(router, 'navigate');

    component.loginForm.setValue({
      email: 'test@email.com',
      password: 'Test-1234'
    });

    component.login();

    expect(router.navigate).toHaveBeenCalledWith(['/starships']);
  });
});
