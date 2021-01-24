import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'md-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  @Input() loginForm: FormGroup;
  @Output() login: EventEmitter<void> = new EventEmitter();

  passwordIsVisible = false;

  constructor() {}

  togglePasswordIsVisible(): void {
    this.passwordIsVisible = !this.passwordIsVisible;
  }

  submit(): void {
    if (this.loginForm.valid) {
      this.login.emit();
    }
  }
}
