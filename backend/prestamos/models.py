from django.db import models
from django.core.validators import MinLengthValidator

class Prestamo(models.Model):
    # Constantes de estado
    ESTADO_PENDIENTE = 'Pendiente'
    ESTADO_APROBADO = 'Aprobado'
    ESTADO_EN_CURSO = 'En Curso'
    ESTADO_RECHAZADO = 'Rechazado'
    ESTADO_DEVUELTO = 'Devuelto'

    ESTADOS = [
        (ESTADO_PENDIENTE, 'Pendiente'),
        (ESTADO_APROBADO, 'Aprobado'),
        (ESTADO_EN_CURSO,'En Curso'),
        (ESTADO_RECHAZADO, 'Rechazado'),
        (ESTADO_DEVUELTO, 'Devuelto'),
    ]

    herramienta = models.CharField(
        max_length=100,
        validators=[MinLengthValidator(3, message="El nombre debe tener al menos 3 caracteres.")]
    )
    fecha_retiro = models.DateField()
    fecha_devolucion = models.DateField()
    fecha_retiro_real = models.DateField(null=True, blank=True)
    fecha_devolucion_real = models.DateField(null=True, blank=True)
    estado = models.CharField(max_length=20, choices=ESTADOS, default=ESTADO_PENDIENTE)
    
    usuario_solicitante = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.herramienta} - {self.estado}"