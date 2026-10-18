
from django.contrib.auth import authenticate

from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


class LoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        email = request.data.get("email", "")
        password = request.data.get("password", "")

        if not isinstance(email, str) or not isinstance(password, str):
            return Response(
                {
                    "error": "El email y la contraseña deben ser válidos."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        email = email.strip()

        if not email or not password:
            return Response(
                {"error": "Ingresá tu email y contraseña."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        usuario = authenticate(
            request,
            email=email,
            password=password,
        )

        if usuario is None:
            return Response(
                {"error": "Email o contraseña incorrectos."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        token, _ = Token.objects.get_or_create(user=usuario)

        return Response(
            {
                "token": token.key,
                "usuario": {
                    "id": usuario.pk,
                    "email": usuario.email,
                    "nombre": usuario.nombre,
                    "rol": usuario.rol,
                },
            },
            status=status.HTTP_200_OK,
        )


class PerfilPruebaView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        usuario = request.user

        return Response(
            {
                "mensaje": "Token válido",
                "id": usuario.pk,
                "email": usuario.email,
                "nombre": usuario.nombre,
                "rol": usuario.rol,
            },
            status=status.HTTP_200_OK,
        )
