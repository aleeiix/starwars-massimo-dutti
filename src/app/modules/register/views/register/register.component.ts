import { RegisterService } from './register.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { emailValidator, strongPasswordValdiator } from '@utils/validations';

import { RoleEnum } from '@models/role.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'md-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  registerError: string;
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.registerForm = new FormGroup({
      role: new FormControl(RoleEnum.CLIENT, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, emailValidator()]),
      password: new FormControl('', [
        Validators.required,
        strongPasswordValdiator()
      ])
    });
  }

  register(): void {
    this.registerService.createUser(this.registerForm.value).subscribe(
      (res) => {
        alert('Gracias por registrarte');
        this.router.navigate(['/login']);
      },
      (err) => {
        this.registerError = err;
      }
    );
  }
}
