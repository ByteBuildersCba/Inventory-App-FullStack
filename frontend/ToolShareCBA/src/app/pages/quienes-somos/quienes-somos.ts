import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactoService } from '../../services/contacto';

@Component({
  selector: 'app-quienes-somos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quienes-somos.html',
  styleUrl: './quienes-somos.css'
})
export class QuienesSomos implements OnInit {
  contactoForm!: FormGroup;
  mensajeEnviado = false;
  errorEnvio = false;

  constructor(
    private fb: FormBuilder,
    private contactoService: ContactoService
  ) {}

  ngOnInit(): void {
    this.contactoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.contactoForm.invalid) {
      this.contactoForm.markAllAsTouched();
      return;
    }

    const nuevoContacto = {
      ...this.contactoForm.value,
      fecha: new Date().toISOString()
    };

    this.contactoService.enviarContacto(nuevoContacto).subscribe({
      next: (res) => {
        this.mensajeEnviado = true;
        this.errorEnvio = false;
        this.contactoForm.reset();
      },
      error: (err) => {
        console.error('Error al enviar formulario:', err);
        this.errorEnvio = true;
      }
    });
  }
}