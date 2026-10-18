from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .models import Prestamo
from .serializers import PrestamoSerializer

class PrestamoListAPIView(APIView):
    # Acceso permitido para pruebas locales
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):
        prestamos = Prestamo.objects.all()
        serializer = PrestamoSerializer(prestamos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        # Mapea los nombres que envía el formulario de Angular
        datos = {
            'herramienta': request.data.get('herramienta'),
            'fecha_retiro': request.data.get('retiro'),
            'fecha_devolucion': request.data.get('devolucion'),
            'estado': 'Pendiente',
            'usuario_solicitante': request.data.get('usuario', 'David')
        }
        serializer = PrestamoSerializer(data=datos)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)