import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LowerCasePipe } from '@angular/common';
import { PrestamoService } from '../../../services/prestamo'; // Ajustá el nombre si es prestamo.service

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, LowerCasePipe],
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private prestamoService = inject(PrestamoService);
  private cd = inject(ChangeDetectorRef); // Asegura que la pantalla se pinte al recibir los datos

  misPrestamos: any[] = [];
  cargando: boolean = true; // 👈 Bandera de espera inicial

  ngOnInit() {
    this.cargarPrestamos();
  }

  cargarPrestamos() {
    this.cargando = true;
    this.prestamoService.obtenerMisPrestamos().subscribe({
      next: (datos) => {
        this.misPrestamos = datos;
        this.cargando = false; // 👈 Ya llegaron los datos
        this.cd.detectChanges(); // 👈 Fuerza a Angular a pintar la tarjeta de inmediato
      },
      error: (err) => {
        console.error('Error al cargar préstamos:', err);
        this.cargando = false;
        this.cd.detectChanges();
      }
    });
  }
}