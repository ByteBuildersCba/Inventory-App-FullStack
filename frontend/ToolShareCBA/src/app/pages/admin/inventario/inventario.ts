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
      descripcion: ['']
    })
  }

  onEnviar() {
    if (this.inventarioForm.valid) {
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
    descripcion: 'Se entrega con maletín plástico rígido.'
  });
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

}