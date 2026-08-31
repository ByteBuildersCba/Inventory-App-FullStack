import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email: string = '';
  password: string = '';

  emailTocado: boolean = false;
  passwordTocado: boolean = false;

  mensajeError: string = '';
  loginExitoso: boolean = false;

  emailValido(): boolean {
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patronEmail.test(this.email);
  }

  passwordValida(): boolean {
    return this.password.length >= 6;
  }

  formularioValido(): boolean {
    return this.emailValido() && this.passwordValida();
  }

  iniciarSesion(): void {

    this.emailTocado = true;
    this.passwordTocado = true;

    this.mensajeError = '';
    this.loginExitoso = false;

    if (!this.formularioValido()) {
      this.mensajeError =
        'Por favor, corregí los campos marcados en rojo.';
      return;
    }

    console.log('Email:', this.email);
    console.log('Contraseña:', this.password);

    this.loginExitoso = true;
  }
}