# Create your tests
from django.core.exceptions import ValidationError
from django.test import TestCase

from .models import Herramienta


class HerramientaModelTests(TestCase):

    def crear_herramienta(self, **cambios):
        datos = {
            "nombre": "Taladro percutor",
            "categoria": Herramienta.Categoria.ALBANILERIA,
            "estado_fisico": Herramienta.EstadoFisico.BUENO,
            "codigo": "ALB-0001",
            "descripcion": "Taladro en buen estado.",
            "image_url": "https://ejemplo.com/taladro.jpg",
            "stock_total": 2,
            "stock_disponible": 2,
        }
        datos.update(cambios)
        return Herramienta(**datos)

    def test_acepta_una_herramienta_valida(self):
        herramienta = self.crear_herramienta()
        herramienta.full_clean()

        self.assertEqual(herramienta.codigo, "ALB-0001")

    def test_rechaza_un_codigo_con_formato_invalido(self):
        herramienta = self.crear_herramienta(codigo="alb-1")

        with self.assertRaises(ValidationError):
            herramienta.full_clean()

    def test_rechaza_stock_total_cero(self):
        herramienta = self.crear_herramienta(stock_total=0)

        with self.assertRaises(ValidationError):
            herramienta.full_clean()

    def test_stock_disponible_no_supera_el_total(self):
        herramienta = self.crear_herramienta(
            stock_total=2,
            stock_disponible=3,
        )

        with self.assertRaises(ValidationError):
            herramienta.full_clean()

    def test_rechaza_codigos_duplicados(self):
        primera = self.crear_herramienta()
        primera.save()

        segunda = self.crear_herramienta()

        with self.assertRaises(ValidationError):
            segunda.full_clean()