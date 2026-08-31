import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {

  nombre: string = '';
  email: string = '';
  password: string = '';
  rol: string = 'user';

  nombreTocado: boolean = false;
  emailTocado: boolean = false;
  passwordTocado: boolean = false;
  rolTocado: boolean = false;

  registroExitoso: boolean = false;
  mensajeError: string = '';

  nombreValido(): boolean {
    return this.nombre.trim().length >= 3;
  }

  emailValido(): boolean {
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patronEmail.test(this.email);
  }

  passwordValida(): boolean {
    return this.password.length >= 6;
  }

  rolValido(): boolean {
    return this.rol === 'user' || this.rol === 'admin';
  }

  formularioValido(): boolean {
    return (
      this.nombreValido() &&
      this.emailValido() &&
      this.passwordValida() &&
      this.rolValido()
    );
  }

  registrar(): void {

    this.nombreTocado = true;
    this.emailTocado = true;
    this.passwordTocado = true;
    this.rolTocado = true;

    this.mensajeError = '';
    this.registroExitoso = false;

    if (!this.formularioValido()) {
      this.mensajeError =
        'Por favor, corregí los campos marcados en rojo.';
      return;
    }

    console.log('Nombre:', this.nombre);
    console.log('Email:', this.email);
    console.log('Contraseña:', this.password);
    console.log('Rol:', this.rol);

    this.registroExitoso = true;
  }
}