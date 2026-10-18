from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator, MinValueValidator
from django.db import models

# Create your models here.
class Herramienta(models.Model):

    class Categoria(models.TextChoices):
        ALBANILERIA = "albañileria", "Albañilería"
        ELECTRICIDAD = "electricidad", "Electricidad"
        CARPINTERIA = "carpinteria", "Carpintería"
        JARDINERIA = "jardineria", "Jardinería"

    class EstadoFisico(models.TextChoices):
        EXCELENTE = "excelente", "Excelente"
        BUENO = "bueno", "Bueno"
        REGULAR = "regular", "Regular / Requiere Mantenimiento"

    nombre = models.CharField(max_length=100)
    categoria = models.CharField(
        max_length=20,
        choices=Categoria.choices,
    )

    estado_fisico = models.CharField(
        max_length=20,
        choices=EstadoFisico.choices,
    )

    codigo = models.CharField(
        max_length=20,
        unique=True,
        validators=[
            RegexValidator(
                regex=r'^[A-Z]{3}-\d{3}$',
                message='El código debe tener el formato AAA-123.',
            )
        ],
    )

    descripcion = models.TextField(blank=True, null=True)

    image_url = models.CharField(
        max_length=200,
        blank=True,
    )

    stock_total = models.PositiveIntegerField(
        validators=[MinValueValidator(1)])
    

    stock_disponible = models.PositiveIntegerField(
        default=1,
    )

    class Meta:
        ordering = ['nombre']
        verbose_name = "Herramienta"
        verbose_name_plural = "Herramientas"

    def clean(self):
        super().clean()

        errores = {}
        if self.stock_disponible > self.stock_total:
            errores['stock_disponible'] = ('El stock disponible no puede ser mayor que el stock total.')

            if errores:
                raise ValidationError(errores)

    def __str__(self):
        return f"{self.nombre}  ({self.codigo})"