import { RegisterService } from './register.service';
import { RoleEnum } from './../../../../models/role.enum';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterComponent } from './register.component';
import { RegisterFormComponent } from './../../components/register-form/register-form.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { emailValidator, strongPasswordValdiator } from '@utils/validations';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent, RegisterFormComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should instance form', () => {
    const form = new FormGroup({
      role: new FormControl(RoleEnum.CLIENT, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, emailValidator()]),
      password: new FormControl('', [
        Validators.required,
        strongPasswordValdiator()
      ])
    });

    expect(component.registerForm.value).toEqual(form.value);
  });

  it('should register error', () => {
    const error = 'Error Test';

    const service = TestBed.inject(RegisterService);

    spyOn(service, 'createUser').and.returnValue(throwError(error));

    component.registerForm.setValue({
      role: RoleEnum.CLIENT,
      name: 'Test',
      lastname: 'Test',
      email: 'test@email.com',
      password: 'Test-1234'
    });

    component.register();

    expect(component.registerError).toEqual(error);
  });

  it('should login succes but response is true', () => {
    const service = TestBed.inject(RegisterService);
    const router = TestBed.inject(Router);

    spyOn(service, 'createUser').and.returnValue(of(true));
    spyOn(router, 'navigate');

    component.registerForm.setValue({
      role: RoleEnum.CLIENT,
      name: 'Test',
      lastname: 'Test',
      email: 'test@email.com',
      password: 'Test-1234'
    });

    component.register();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
