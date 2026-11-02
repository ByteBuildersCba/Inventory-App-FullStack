import copy

from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework import serializers

from .models import Herramienta


class HerramientaSerializer(serializers.ModelSerializer):

    estadoFisico = serializers.ChoiceField(
        source="estado_fisico",
        choices=Herramienta.EstadoFisico.choices,
    )

    imageUrl = serializers.CharField(
        source="image_url",
        required=False,
        allow_blank=True,
        max_length=200,
    )

    stockTotal = serializers.IntegerField(
        source="stock_total",
        min_value=1,
    )

    stockDisponible = serializers.IntegerField(
        source="stock_disponible",
        min_value=0,
    )

    class Meta:
        model = Herramienta
        fields = [
            'id',
            'codigo',
            'nombre',
            'categoria',
            'estadoFisico',
            'descripcion',
            'imageUrl',
            'stockTotal',
            'stockDisponible',
        ]

    def validate(self, attrs):
        # Para una modificación, copiamos la herramienta existente.
        # Para un registro nuevo, creamos una instancia vacía.
        if self.instance is not None:
            herramienta = copy.copy(self.instance)
        else:
            herramienta = Herramienta()

        # Incorporamos los datos recibidos por la API.
        for campo, valor in attrs.items():
            setattr(herramienta, campo, valor)

        # Ejecutamos todas las validaciones del modelo.
        try:
            herramienta.full_clean()

        except DjangoValidationError as error:
            errores = error.message_dict

            # Adaptamos el nombre del campo al que utiliza la API.
            if 'stock_disponible' in errores:
                errores['stockDisponible'] = errores.pop(
                    'stock_disponible'
                )

            raise serializers.ValidationError(errores)

        return attrs
