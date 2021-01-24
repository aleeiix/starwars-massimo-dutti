import { FormGroup } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { RoleEnum } from '@models/role.enum';

@Component({
  selector: 'md-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent {
  RoleEnum = RoleEnum;

  @Input() registerForm: FormGroup;
  @Output() register: EventEmitter<void> = new EventEmitter();

  passwordIsVisible = false;

  constructor() {}

  togglePasswordIsVisible(): void {
    this.passwordIsVisible = !this.passwordIsVisible;
  }

  submit(): void {
    if (this.registerForm.valid) {
      this.register.emit();
    }
  }
}
