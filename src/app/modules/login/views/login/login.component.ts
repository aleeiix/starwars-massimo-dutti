import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './login.service';

@Component({
  selector: 'md-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loginError: string;
  loginForm: FormGroup;

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login(): void {
    this.loginService.login(this.loginForm.value).subscribe(
      (res) => {
        if (res) {
          alert('Sesión iniciada');
          this.router.navigate(['/starships']);
        } else {
          this.loginError =
            'El correo electrónico y/o contraseña no es correcto.';
        }
      },
      (err) => {
        this.loginError = err;
      }
    );
  }
}
