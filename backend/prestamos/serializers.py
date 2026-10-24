from rest_framework import serializers
from .models import Prestamo

class PrestamoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prestamo
        fields = '__all__'
        # Le decimos a Django que nosotros llenaremos estos datos en la vista
        read_only_fields = ['usuario_solicitante', 'estado']