from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Herramienta
from .serializers import HerramientaSerializer

class HerramientaView(APIView):
    def get(self, request):
        herramientas = Herramienta.objects.all()

        serializer = HerramientaSerializer(herramientas, many = True)
        return Response(serializer.data)

    def post(self, request):
        serializer = HerramientaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
