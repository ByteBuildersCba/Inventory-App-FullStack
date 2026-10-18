"""
Django settings for config project.
"""

from pathlib import Path
import os
from dotenv import load_dotenv


# --------------------------------------------------
# RUTAS Y VARIABLES DE ENTORNO
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent

# Carga las variables guardadas en backend/.env
load_dotenv(BASE_DIR / ".env")


# --------------------------------------------------
# SEGURIDAD Y DESARROLLO
# --------------------------------------------------

SECRET_KEY = os.getenv(
    "DJANGO_SECRET_KEY",
    "django-insecure-clave-solo-para-desarrollo-local"
)

DEBUG = os.getenv("DJANGO_DEBUG", "True").lower() == "true"

ALLOWED_HOSTS = [
    host.strip()
    for host in os.getenv("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1").split(",")
    if host.strip()
]


# --------------------------------------------------
# APLICACIONES INSTALADAS
# --------------------------------------------------

INSTALLED_APPS = [
    # Aplicaciones propias de Django
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # API REST
    "rest_framework",
    "rest_framework.authtoken",

    # ComunicaciÃ³n con Angular
    "corsheaders",

    # Aplicaciones de ToolShare CBA
    "usuarios",
    "herramientas",
    "prestamos",
]


# --------------------------------------------------
# MIDDLEWARE
# --------------------------------------------------

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


# --------------------------------------------------
# CORS: PERMITE LA COMUNICACIÃ“N CON ANGULAR
# --------------------------------------------------

CORS_ALLOWED_ORIGINS = [
    "http://localhost:4200",
    "http://127.0.0.1:4200",
]


# --------------------------------------------------
# CONFIGURACIÃ“N GENERAL DE DJANGO
# --------------------------------------------------

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"


# --------------------------------------------------
# BASE DE DATOS MYSQL
# --------------------------------------------------

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": os.getenv("DB_NAME", "toolshare_db"),
        "USER": os.getenv("DB_USER", "root"),
        "PASSWORD": os.getenv("DB_PASSWORD", "root"),
        "HOST": os.getenv("DB_HOST", "127.0.0.1"),
        "PORT": os.getenv("DB_PORT", "3306"),
        "OPTIONS": {
            "charset": "utf8mb4",
        },
    }
}


# --------------------------------------------------
# MODELO DE USUARIO PERSONALIZADO
# --------------------------------------------------

AUTH_USER_MODEL = "usuarios.Usuario"


# --------------------------------------------------
# VALIDACIÃ“N DE CONTRASEÃ‘AS
# --------------------------------------------------

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": (
            "django.contrib.auth.password_validation."
            "UserAttributeSimilarityValidator"
        ),
    },
    {
        "NAME": (
            "django.contrib.auth.password_validation."
            "MinimumLengthValidator"
        ),
    },
    {
        "NAME": (
            "django.contrib.auth.password_validation."
            "CommonPasswordValidator"
        ),
    },
    {
        "NAME": (
            "django.contrib.auth.password_validation."
            "NumericPasswordValidator"
        ),
    },
]


# --------------------------------------------------
# IDIOMA, ZONA HORARIA Y FECHAS
# --------------------------------------------------

LANGUAGE_CODE = "es-ar"

TIME_ZONE = "America/Argentina/Cordoba"

USE_I18N = True

USE_TZ = True


# --------------------------------------------------
# ARCHIVOS ESTÃTICOS
# --------------------------------------------------

STATIC_URL = "static/"


# --------------------------------------------------
# CORREO ELECTRÃ“NICO PARA DESARROLLO
# --------------------------------------------------

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"


# --------------------------------------------------
# CLAVE PRIMARIA POR DEFECTO
# --------------------------------------------------

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
