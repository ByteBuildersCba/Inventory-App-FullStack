import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthApi } from '../../services/auth-api';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {

  registroExitoso: boolean = false;
  mensajeError: string = '';

  formulario = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),

    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  }); // <--- Cierra el FormGroup

  constructor(private authApi: AuthApi) {}

  registrar(): void {
    this.registroExitoso = false;
    this.mensajeError = '';

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.mensajeError =
        'Por favor, corregí los campos marcados en rojo.';
      return;
    }

    const { nombre, email, password } = this.formulario.value;

    this.authApi.registrarUsuario(nombre!, email!, password!).subscribe({
      next: (respuesta) => {
        this.registroExitoso = true;
        this.formulario.reset();
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);

        if (err.error && err.error.error) {
          this.mensajeError = err.error.error;
        } else {
          this.mensajeError =
            'No se pudo conectar con el servidor. Intentá nuevamente.';
        }
      }
    });
  }

}