import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {
  emailValidator,
  strongPasswordValdiator
} from './../../../../utils/validations';

import { RoleEnum } from './../../../../models/role.enum';

@Component({
  selector: 'md-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
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

  register() {
    alert('REGISTRO');
  }
}
