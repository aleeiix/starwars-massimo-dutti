import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;

    component.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change passwordIsVisible to opposite', () => {
    const oppositePasswordIsVisible = !component.passwordIsVisible;

    component.togglePasswordIsVisible();

    expect(component.passwordIsVisible).toEqual(oppositePasswordIsVisible);
  });

  it('should invalid submit because invalid form', () => {
    spyOn(component.login, 'emit');

    component.submit();

    expect(component.login.emit).toHaveBeenCalledTimes(0);
  });

  it('should submit because valid form', () => {
    spyOn(component.login, 'emit');

    component.loginForm.setValue({
      email: 'test@email.com',
      password: 'Test-1234'
    });

    component.submit();

    expect(component.login.emit).toHaveBeenCalledTimes(1);
  });
});
