from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import Prestamo
from .serializers import PrestamoSerializer

class MisPrestamosAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        prestamos = Prestamo.objects.filter(usuario_solicitante=request.user.email)
        serializer = PrestamoSerializer(prestamos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        datos = {
            'herramienta': request.data.get('herramienta'),
            'fecha_retiro': request.data.get('retiro'),
            'fecha_devolucion': request.data.get('devolucion'),
        }
        
        serializer = PrestamoSerializer(data=datos)
        
        if serializer.is_valid():
            # Inyectamos el usuario real y el estado usando la constante del modelo
            serializer.save(
                usuario_solicitante=request.user.email,
                estado=Prestamo.ESTADO_PENDIENTE
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        # Si sigue fallando algo, esto te mostrará en consola qué campo exacto falta
        print("Errores de validación:", serializer.errors) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)