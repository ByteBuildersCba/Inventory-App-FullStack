
from django.contrib import admin
from django.urls import path, include
from prestamos.views import MisPrestamosAPIView
from usuarios.views_auth import LoginView, RegistroView, PerfilPruebaView
from prestamos.views import MisPrestamosAPIView, AdminPrestamoListAPIView, AdminPrestamoDetailAPIView


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
        "api/v1/herramientas/",
        include("herramientas.urls"),
    ),

    path(
    "api/v1/prestamos/",
    MisPrestamosAPIView.as_view(),
    name="prestamos_list",
    ),
    path(
        "api/v1/prestamos/admin/",
        AdminPrestamoListAPIView.as_view(),
        name="admin_prestamos_list",
    ),
    path(
        "api/v1/prestamos/<int:pk>/estado/",
        AdminPrestamoDetailAPIView.as_view(),
        name="admin_prestamos_estado",
    ),
]
