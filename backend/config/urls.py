
from django.contrib import admin
from django.urls import path, include
from prestamos.views import PrestamoListAPIView
from usuarios.views_auth import LoginView, RegistroView, PerfilPruebaView


urlpatterns = [
    path("admin/", admin.site.urls),

    # Autenticación de usuarios
    path(
        "api/usuarios/login/",
        LoginView.as_view(),
        name="login",
    ),
    path(
        "api/usuarios/registro/",
        RegistroView.as_view(),
        name="registro",
    ),
    path(
        "api/usuarios/perfil-prueba/",
        PerfilPruebaView.as_view(),
        name="perfil-prueba",
    ),

    # API de herramientas
    path(
        "api/v1/",
        include("herramientas.urls"),
    ),

    path('api/v1/prestamos/', PrestamoListAPIView.as_view(), name='prestamos_list'),
]
