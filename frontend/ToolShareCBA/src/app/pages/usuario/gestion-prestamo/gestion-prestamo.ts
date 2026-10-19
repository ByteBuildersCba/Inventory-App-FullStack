import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrestamoService } from '../../../services/prestamo'; // O prestamo.service según tu archivo

@Component({
  selector: 'app-gestion-prestamo',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  styleUrl: './gestion-prestamo.css',
  templateUrl: './gestion-prestamo.html',
})
export class GestionPrestamo {
  private formBuilder = inject(FormBuilder);
  private prestamoService = inject(PrestamoService);

  // 👈 Variable que faltaba declarar:
  mostrarAlerta: boolean = false;

  SolicitudForm = this.formBuilder.group({
    herramienta: ['', [Validators.required]],
    retiro: ['', [Validators.required]],
    devolucion: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.SolicitudForm.valid) {
      this.prestamoService.registrarSolicitud(this.SolicitudForm.value).subscribe({
        next: (respuesta) => {
          console.log('¡Préstamo registrado en MySQL!', respuesta);
          
          // Activa la alerta en pantalla
          this.mostrarAlerta = true;
          this.SolicitudForm.reset();

          // Oculta la alerta luego de 3 segundos
          setTimeout(() => {
            this.mostrarAlerta = false;
          }, 3000);
        },
        error: (err) => {
          console.error('Error al registrar el préstamo:', err);
          alert('Hubo un error al conectar con el servidor.');
        }
      });
    } else {
      this.SolicitudForm.markAllAsTouched();
    }
  }
}