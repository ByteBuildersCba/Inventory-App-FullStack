import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PrestamoService } from '../../../services/prestamo';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private prestamoService = inject(PrestamoService);
  private cd = inject(ChangeDetectorRef);

  misPrestamos: any[] = [];
  prestamosActivos: any[] = [];
  historialPrestamos: any[] = [];
  cantidadVencidos = 0;
  cargando = true;

  ngOnInit(): void {
    this.cargarPrestamos();
  }

  estadoVisual(prestamo: any): string {
    const estado = String(prestamo.estado ?? '').trim().toLowerCase();
    const fechaLimite = String(prestamo.fecha_devolucion ?? '').slice(0, 10);

    if (estado === 'vencido') {
      return 'vencido';
    }

    const hoy = new Date();
    const hoyISO = [
      hoy.getFullYear(),
      String(hoy.getMonth() + 1).padStart(2, '0'),
      String(hoy.getDate()).padStart(2, '0'),
    ].join('-');

    if (estado === 'en curso' && fechaLimite && fechaLimite < hoyISO) {
      return 'vencido';
    }

    return estado.replace(/\s+/g, '-');
  }

  cargarPrestamos(): void {
    this.cargando = true;

    this.prestamoService.obtenerMisPrestamos().subscribe({
      next: (datos) => {
        this.misPrestamos = Array.isArray(datos) ? datos : [];

        this.prestamosActivos = this.misPrestamos.filter((prestamo) => {
          const estado = String(prestamo.estado ?? '').trim().toLowerCase();
          return estado !== 'devuelto' && estado !== 'rechazado';
        });

        this.historialPrestamos = this.misPrestamos.filter((prestamo) => {
          const estado = String(prestamo.estado ?? '').trim().toLowerCase();
          return estado === 'devuelto' || estado === 'rechazado';
        });

        this.cantidadVencidos = this.prestamosActivos.filter(
          (prestamo) => this.estadoVisual(prestamo) === 'vencido'
        ).length;

        this.cargando = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar préstamos:', err);
        this.cargando = false;
        this.cd.detectChanges();
      },
    });
  }
}