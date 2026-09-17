import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario';
import { Auth } from '../../services/auth';

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

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private auth: Auth,
    private cdr: ChangeDetectorRef
  ) {}

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

      this.cdr.markForCheck();

      return;
    }

    this.usuarioService
      .buscarPorCredenciales(this.email, this.password)
      .subscribe({

        next: (usuarios) => {

          if (usuarios.length === 0) {

            this.mensajeError =
              'El correo o la contraseña son incorrectos.';

            this.cdr.markForCheck();

            return;
          }

          const usuario = usuarios[0];

          this.auth.iniciarSesion({
            email: usuario.email,
            rol: usuario.rol
          });

          this.loginExitoso = true;

          this.cdr.markForCheck();

          if (usuario.rol === 'admin') {

            this.router.navigate(['/admin/dashboard']);

          } else {

            this.router.navigate(['/usuario/dashboard']);

          }

        },

        error: (error) => {

          console.error('Error al iniciar sesión:', error);

          this.mensajeError =
            'No se pudo conectar con el servidor. Intentá nuevamente.';

          this.cdr.markForCheck();

        }

      });
  }
}