
from django.contrib.auth import authenticate

from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from usuarios.models import Usuario


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

class RegistroView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        nombre = request.data.get("nombre", "")
        email = request.data.get("email", "")
        password = request.data.get("password", "")

        # 1. Validar tipos de datos recibidos
        if not isinstance(nombre, str) or not isinstance(email, str) or not isinstance(password, str):
            return Response(
                {"error": "Los datos ingresados no son válidos."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        nombre = nombre.strip()
        email = email.strip()

        # 2. Validar campos obligatorios
        if not nombre or not email or not password:
            return Response(
                {"error": "Todos los campos (nombre, correo y contraseña) son obligatorios."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # 3. Validar longitud mínima de la contraseña
        if len(password) < 8:
            return Response(
                {"error": "La contraseña debe tener al menos 8 caracteres."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # 4. Validar que el correo no esté registrado previamente
        if Usuario.objects.filter(email=email).exists():
            return Response(
                {"error": "Ya existe una cuenta registrada con este correo electrónico."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # 5. Crear el usuario de forma segura asignando el rol 'user' obligatoriamente
        try:
            usuario = Usuario.objects.create_user(
                email=email,
                password=password,
                nombre=nombre,
                rol=Usuario.Rol.USER,
            )
        except Exception:
            return Response(
                {"error": "Ocurrió un error al registrar la cuenta. Intentalo de nuevo."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        # respuesta de éxito sin incluir contraseñas
        return Response(
            {
                "mensaje": "Usuario registrado correctamente.",
                "usuario": {
                    "id": usuario.pk,
                    "email": usuario.email,
                    "nombre": usuario.nombre,
                    "rol": usuario.rol,
                },
            },
            status=status.HTTP_201_CREATED,
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
