import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {InventarioService} from '../../../services/inventario'

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-inventario',
  styleUrl: './inventario.css',
  templateUrl: './inventario.html',
  standalone : true,
})
export class Inventario implements OnInit {
  inventarioForm: FormGroup;
  listaHerramientas: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private inventarioService : InventarioService  )
    {
    this.inventarioForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      estadoFisico: ['', [Validators.required]],
      codigo: ['', [Validators.required]],
      descripcion: [''],
      imageUrl:['', [Validators.required]],
      stockTotal:[1, [Validators.required, Validators.min(1)]],
      
    })
  }
  ngOnInit(): void {

    this.cargarHerramientas();
  }
  cargarHerramientas(): void {
    this.inventarioService.obtenerHerramientas().subscribe({
      next: (datos) => {
        this.listaHerramientas = datos;
      },
      error: (err) => console.error('Error al traer la herramienta:', err)
    });
  }

  onEnviar(): void {
    if (this.inventarioForm.valid) {
      const nuevaHerramienta = {
        ...this.inventarioForm.value,
        stockDisponible: this.inventarioForm.value.stockTotal
      };
      this.inventarioService.guardarHerramienta(nuevaHerramienta).subscribe({
        next:() => {
          alert('Herramienta guardada con exito en la Base de Datos');
          this.inventarioForm.reset();
          this.cargarHerramientas();

        },
        error:(err) => console.error('Error al guardar:', err)
      });
      
      
    } else {
      this.inventarioForm.markAllAsTouched();
    }
  }
  
modificarDatos(): void {
  this.inventarioForm.patchValue({
    nombre: 'Taladro Percutor Bosch',
    categoria: 'albañileria',
    estadoFisico: 'bueno',
    codigo: 'ALB-002',
    descripcion: 'Se entrega con maletín plástico rígido.',
    imageUrl: 'https://ejemplo.com/taladro.jpg',
      stockTotal: 2,
      stockDisponible: 1
  });
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

}