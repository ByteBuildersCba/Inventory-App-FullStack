from django.db import models
from django.core.validators import MinLengthValidator

class Prestamo(models.Model):
    ESTADOS = [
        ('Pendiente', 'Pendiente'),
        ('Aprobado', 'Aprobado'),
        ('Rechazado', 'Rechazado'),
        ('Devuelto', 'Devuelto'),
    ]

    herramienta = models.CharField(
        max_length=100,
        validators=[MinLengthValidator(3, message="El nombre debe tener al menos 3 caracteres.")]
    )
    fecha_retiro = models.DateField()
    fecha_devolucion = models.DateField()
    estado = models.CharField(max_length=20, choices=ESTADOS, default='Pendiente')
    usuario_solicitante = models.CharField(max_length=100, default='David')

    def __str__(self):
        return f"{self.herramienta} - {self.estado}"