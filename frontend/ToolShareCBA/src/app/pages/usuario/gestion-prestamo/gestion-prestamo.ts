import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrestamoService } from '../../../services/prestamo';

@Component({
  selector: 'app-gestion-prestamo',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  styleUrl: './gestion-prestamo.css',
  templateUrl: './gestion-prestamo.html',
})
export class GestionPrestamo implements OnInit {
  private formBuilder = inject(FormBuilder);
  private prestamoService = inject(PrestamoService);
  private cd = inject(ChangeDetectorRef); // 👈 Forzar refresco de pantalla

  mostrarAlerta: boolean = false;
  cargandoHerramientas: boolean = false;
  herramientasDisponibles: any[] = [];
  errorHerramientas: string = '';

  SolicitudForm = this.formBuilder.group({
    herramienta: ['', [Validators.required]],
    retiro: ['', [Validators.required]],
    devolucion: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.cargarHerramientas();
  }

  cargarHerramientas(): void {
    this.cargandoHerramientas = true;
    
    this.prestamoService.obtenerHerramientas().subscribe({
      next: (respuesta: any) => {
        const listado = Array.isArray(respuesta) ? respuesta : (respuesta.results || []);
        this.herramientasDisponibles = listado;
        this.cargandoHerramientas = false;
        
        this.cd.detectChanges(); // 👈 Obliga a Angular a actualizar la vista de inmediato
      },
      error: (err) => {
        console.error('Error al cargar herramientas:', err);
        this.cargandoHerramientas = false;
        this.cd.detectChanges();
      }
    });
  }

  onSubmit(): void {
    if (this.SolicitudForm.valid) {
      this.prestamoService.registrarSolicitud(this.SolicitudForm.value).subscribe({
        next: (respuesta) => {
          this.mostrarAlerta = true;
          this.SolicitudForm.reset();
          setTimeout(() => this.mostrarAlerta = false, 3000);
          this.cd.detectChanges();
        },
        error: (err) => console.error(err)
      });
    } else {
      this.SolicitudForm.markAllAsTouched();
    }
  }
}