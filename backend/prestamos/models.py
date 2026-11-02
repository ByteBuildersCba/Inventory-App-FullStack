from django.db import models
from django.core.validators import MinLengthValidator
from django.core.exceptions import ValidationError

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

    def clean(self):
        if self.fecha_retiro and self.fecha_devolucion:
            if self.fecha_devolucion <= self.fecha_retiro:
                raise ValidationError({
                'fecha_devolucion': 'La fecha de devolución debe ser posterior a la fecha de retiro.'
                })

                
    def __str__(self):
        return f"{self.herramienta} - {self.estado}"

    def clean(self):
        super().clean()
        if self.fecha_devolucion_esperada and self.fecha_prestamo:
            if self.fecha_devolucion_esperada < self.fecha_prestamo:
                raise ValidationError({
                    'fecha_devolucion_esperada': 'La fecha de devolución esperada no puede ser anterior a la fecha de préstamo.'
                })