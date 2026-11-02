
from rest_framework import serializers
from .models import Prestamo
from django.utils import timezone


class PrestamoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Prestamo
        fields = '__all__'
        read_only_fields = ['usuario_solicitante', 'estado']

    def validate(self, data):
        fecha_retiro = data.get(
            'fecha_retiro',
            getattr(self.instance, 'fecha_retiro', None)
        )

        fecha_devolucion = data.get(
            'fecha_devolucion',
            getattr(self.instance, 'fecha_devolucion', None)
        )
        if fecha_retiro and fecha_retiro < timezone.localdate():
            raise serializers.ValidationError({
            'fecha_retiro': 'La fecha de retiro no puede ser anterior a hoy.'
            })

        if fecha_retiro and fecha_devolucion:


            if fecha_devolucion <= fecha_retiro:
                raise serializers.ValidationError({
                    'fecha_devolucion':
                    'La fecha de devolución debe ser posterior a la fecha de retiro.'
                })

        return data
