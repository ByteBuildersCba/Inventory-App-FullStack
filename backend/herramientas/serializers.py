from rest_framework import serializers
from .models import Herramienta


class HerramientaSerializer(serializers.ModelSerializer):
    estadoFisico = serializers.CharField(source="estado_fisico")
    imageUrl = serializers.CharField(
        source="image_url", required=False, allow_blank=True)
    stockTotal = serializers.IntegerField(source="stock_total")
    stockDisponible = serializers.IntegerField(source="stock_disponible")


    class Meta:
        model = Herramienta
        fields = ['id', 'codigo', 'nombre', 'categoria', 'estadoFisico',
                  'descripcion', 'imageUrl', 'stockTotal', 'stockDisponible']
