
from django.contrib import admin
from django.urls import path, include

from usuarios.views_auth import LoginView, PerfilPruebaView


urlpatterns = [
    path("admin/", admin.site.urls),

    # Autenticación de usuarios
    path(
        "api/usuarios/login/",
        LoginView.as_view(),
        name="login",
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
]
