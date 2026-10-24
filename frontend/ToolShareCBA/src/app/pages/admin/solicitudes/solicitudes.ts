import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AdminPrestamoService } from '../../../services/admin-prestamo';
import { OnInit, inject, ChangeDetectorRef } from '@angular/core';

@Component({
  imports: [RouterLink],
  selector: 'app-solicitudes',
  standalone: true,
  styleUrl: './solicitudes.css',
  templateUrl: './solicitudes.html',
})
export class Solicitudes implements OnInit {
  private adminPrestamoService = inject(AdminPrestamoService);
  private cd = inject(ChangeDetectorRef);

  solicitudesPendientes: any[] = [];

  ngOnInit() {
    this.cargarSolicitudes();
}

cargarSolicitudes() {
    this.adminPrestamoService.obtenerTodasLasSolicitudes().subscribe({
      next: (datos) => {
        this.solicitudesPendientes = Array.isArray(datos) ? datos : [];
        this.cd.detectChanges(); 
      },
      error: (err) => console.error('Error al cargar las solicitudes', err)
    });
  }

gestionarSolicitud(id: number, accion: string) {
  this.adminPrestamoService.actualizarEstadoPrestamo(id, accion).subscribe({
    next: (respuesta) => {
      console.log(`Solicitud ${id} marcada como ${accion}`);
      this.cargarSolicitudes(); 
      },
      error: (err) => alert(`Hubo un error al intentar ${accion} el préstamo.`)
    });
  }
}
