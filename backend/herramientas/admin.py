from django.contrib import admin
from .models import Herramienta

@admin.register(Herramienta)
class HerramientaAdmin(admin.ModelAdmin):
    list_display = ('codigo', 'nombre', 'categoria', 'estado_fisico', 'stock_disponible', 'stock_total')
    search_fields = ('nombre', 'codigo')
    list_filter = ('categoria', 'estado_fisico')