
from django.contrib import admin
from .models import Usuario


@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = (
        "email",
        "nombre",
        "rol",
        "is_active",
        "is_staff",
    )

    list_filter = (
        "rol",
        "is_active",
        "is_staff",
    )

    search_fields = (
        "email",
        "nombre",
    )

    ordering = ("email",)

    # La contraseña no se puede editar directamente desde el panel.
    readonly_fields = (
        "password",
        "last_login",
        "date_joined",
    )

    fields = (
        "email",
        "nombre",
        "rol",
        "is_active",
        "is_staff",
        "is_superuser",
        "password",
        "last_login",
        "date_joined",
    )

    # Los usuarios se crearán mediante el registro de la aplicación
    # o mediante el comando createsuperuser.
    def has_add_permission(self, request):
        return False
