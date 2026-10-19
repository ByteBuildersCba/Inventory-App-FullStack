from django.urls import path
from .views import HerramientaView

urlpatterns = [
    path("herramientas/", HerramientaView.as_view(), name="herramientas_list"),

]