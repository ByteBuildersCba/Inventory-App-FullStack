import { Component, inject } from '@angular/core';
import {  RouterLink } from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { PrestamoService } from '../../../services/prestamo';

@Component({
  imports: [RouterLink,ReactiveFormsModule],
  selector: 'app-gestion-prestamo',
  styleUrl: './gestion-prestamo.css',
  templateUrl: './gestion-prestamo.html',
})
export class GestionPrestamo {
  private formBuilder = inject(FormBuilder);
  private prestamoService = inject(PrestamoService);
  
  mostrarAlerta: boolean = false; // Variable para controlar la visibilidad de la alerta

   // Se crea el grupo que representa todo el formulario en el HTML
  SolicitudForm = this.formBuilder.group({
    herramienta: ['', [Validators.required]],
    retiro: ['', [Validators.required]],
    devolucion: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.SolicitudForm.valid) {
      console.log('Formulario válido. Empaquetando datos...');
      
      // 1. Empaquetamos los datos sumando el estado inicial para el administrador
      const nuevaSolicitud = {
        ...this.SolicitudForm.value,
        estado: 'Pendiente', // El filtro clave para el admin
        usuarioSolicitante: 'David', // Simulamos el usuario actual
        fechaPeticion: new Date().toLocaleDateString()
      };

      // 2. Enviamos el paquete a db.json usando el servicio
      this.prestamoService.registrarSolicitud(nuevaSolicitud).subscribe({
        next: (respuesta) => {
          console.log('¡Guardado con éxito!', respuesta);
          
          /* 3. Mostramos la alerta de éxito */
          this.mostrarAlerta = true;
          
          // 4. Limpiamos el formulario para una nueva solicitud
          this.SolicitudForm.reset(); 

          /* 5. Ocultamos la alerta automáticamente después de 3 segundos */
          setTimeout(() => {
            this.mostrarAlerta = false;
          }, 3000);
        },
        error: (err) => {
          console.error('Hubo un error al guardar', err);
        }
      });
      
    } else {
      /* Si intentan enviar el formulario incompleto, marcamos todos los campos 
      como "tocados" para que salten las alertas rojas en el HTML.*/
      console.log('Faltan completar campos');
      this.SolicitudForm.markAllAsTouched();
    }
  
  }
}
