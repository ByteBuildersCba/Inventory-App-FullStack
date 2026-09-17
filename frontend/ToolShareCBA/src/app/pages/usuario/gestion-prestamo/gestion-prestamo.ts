import { Component, inject } from '@angular/core';
import {  RouterLink } from '@angular/router';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { Footer } from '../../../shared/components/footer/footer';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { validate } from '@angular/forms/signals';

@Component({
  imports: [Navbar, RouterLink,ReactiveFormsModule, Footer],
  selector: 'app-gestion-prestamo',
  styleUrl: './gestion-prestamo.css',
  templateUrl: './gestion-prestamo.html',
})
export class GestionPrestamo {

  private formBuilder = inject(FormBuilder);
  mostrarAlerta: boolean = false; // Variable para controlar la visibilidad de la alerta

   // Se crea el grupo que representa todo el formulario en el HTML
  SolicitudForm = this.formBuilder.group({
    herramienta: ['', [Validators.required]],
    retiro: ['', [Validators.required]],
    devolucion: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.SolicitudForm.valid) {
      console.log('Formulario válido. Datos a enviar:', this.SolicitudForm.value);
      
      /* 1. Mostramos la alerta de éxito*/
      this.mostrarAlerta = true;
      
      // 2. Limpiamos el formulario para una nueva solicitud
      this.SolicitudForm.reset(); 

      /* 3. Ocultamos la alerta automáticamente después de 3 segundos*/
      setTimeout(() => {
        this.mostrarAlerta = false;
      }, 3000);
      
    } else {
      /* Si intentan enviar el formulario incompleto, marcamos todos los campos 
      como "tocados" para que salten las alertas rojas en el HTML.*/
      console.log('Faltan completar campos');
      this.SolicitudForm.markAllAsTouched();
  }
  }
}
