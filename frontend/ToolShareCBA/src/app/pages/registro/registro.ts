import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario';

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
      Validators.minLength(6)
    ])
  });

  constructor(private usuarioService: UsuarioService) {}

  registrar(): void {

    this.registroExitoso = false;
    this.mensajeError = '';

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.mensajeError =
        'Por favor, corregí los campos marcados en rojo.';
      return;
    }

    const nuevoUsuario = {
      nombre: this.formulario.value.nombre!,
      email: this.formulario.value.email!,
      password: this.formulario.value.password!,
      rol: 'user' as const
    };
    console.log('Usuario que Angular va a enviar:', nuevoUsuario);

    this.usuarioService.crearUsuario(nuevoUsuario).subscribe({

      next: () => {

        this.registroExitoso = true;

        this.formulario.reset();

      },

      error: (error) => {

        console.error('Error al registrar usuario:', error);

        this.mensajeError =
          'No se pudo registrar el usuario. Intentá nuevamente.';

      }

    });

  }
}