
import { Component } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthApi } from '../../services/auth-api';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  formulario;
  enviado = false;
  cargando = false;
  mensajeError = '';
  loginExitoso = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authApi: AuthApi,
    private auth: Auth
  ) {
    this.formulario = this.fb.nonNullable.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]
    });
  }

  iniciarSesion(): void {
    this.enviado = true;
    this.mensajeError = '';
    this.loginExitoso = false;

    if (this.formulario.invalid || this.cargando) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.cargando = true;

    const { email, password } = this.formulario.getRawValue();

    this.authApi.iniciarSesion(email.trim(), password).subscribe({
      next: (respuesta) => {
        this.auth.iniciarSesion(
          respuesta.usuario,
          respuesta.token
        );

        this.loginExitoso = true;
        this.cargando = false;

        if (respuesta.usuario.rol === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/usuario/dashboard']);
        }
      },
      error: (error: HttpErrorResponse) => {
  this.cargando = false;
  this.loginExitoso = false;

  console.error('Error de inicio de sesión:', error);

  if (error.status === 400 || error.status === 401) {
    this.mensajeError =
      typeof error.error?.error === 'string'
        ? error.error.error
        : 'El correo o la contraseña son incorrectos.';
  } else {
    this.mensajeError =
      'No se pudo conectar con el servidor. Intentá nuevamente.';
  }
}
    });
  }
}
