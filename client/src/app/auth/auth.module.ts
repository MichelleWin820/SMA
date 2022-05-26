import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthRoutingModule } from 'src/app/auth/auth-routing.module';
import { LoginFormComponent } from 'src/app/auth/login-form/login-form.component';
import { LoginPageComponent } from 'src/app/auth/login-page/login-page.component';

@NgModule({
  declarations: [
    LoginFormComponent, //
    LoginPageComponent,
  ],
  imports: [
    AuthRoutingModule, //
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
