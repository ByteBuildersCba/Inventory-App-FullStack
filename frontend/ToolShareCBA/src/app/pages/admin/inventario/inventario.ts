import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-inventario',
  styleUrl: './inventario.css',
  templateUrl: './inventario.html',
  standalone : true,
})
export class Inventario {
  inventarioForm: FormGroup;

  constructor(private formBuilder: FormBuilder){
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

  onEnviar() {
    if (this.inventarioForm.valid) {
      const nuevaHerramienta = {
        ...this.inventarioForm.value,
        stockDisponible: this.inventarioForm.value.stockTotal
      };
      
      console.log("Nueva herramienta registrada:", this.inventarioForm.value);
      alert("Herramienta cargada con éxito");
      this.inventarioForm.reset();
    } else {
      this.inventarioForm.markAllAsTouched();
    }
  }
  
modificarDatos() {
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