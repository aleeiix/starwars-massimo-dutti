import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoleEnum } from './../../../../models/role.enum';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
import { MatRadioModule } from '@angular/material/radio';

import { RegisterFormComponent } from './register-form.component';
import {
  emailValidator,
  strongPasswordValdiator
} from 'src/app/utils/validations';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterFormComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatRadioModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;

    component.registerForm = new FormGroup({
      role: new FormControl(RoleEnum.CLIENT, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, emailValidator()]),
      password: new FormControl('', [
        Validators.required,
        strongPasswordValdiator()
      ])
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
    spyOn(component.register, 'emit');

    component.submit();

    expect(component.register.emit).toHaveBeenCalledTimes(0);
  });

  it('should submit because valid form', () => {
    spyOn(component.register, 'emit');

    component.registerForm.setValue({
      role: RoleEnum.CLIENT,
      name: 'Test',
      lastname: 'Test',
      email: 'test@email.com',
      password: 'Test-1234'
    });

    component.submit();

    expect(component.register.emit).toHaveBeenCalledTimes(1);
  });
});
