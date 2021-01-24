import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { RegisterRoutingModule } from './register-routing.module';

import { RegisterComponent } from './views/register/register.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

@NgModule({
  declarations: [RegisterComponent, RegisterFormComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class RegisterModule {}
