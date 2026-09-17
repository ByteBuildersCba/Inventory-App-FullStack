# ToolShare CBA

Aplicación web para la **gestión de préstamos de herramientas comunitarias** en la ciudad de Córdoba.

El proyecto busca facilitar el acceso a herramientas para trabajadores de oficio, emprendedores y aficionados, promoviendo una gestión organizada, transparente y accesible de los recursos comunitarios.

---

## Propósito del sistema

Actualmente, muchas personas no pueden acceder fácilmente a determinadas herramientas debido a su alto costo o a que solo las necesitan ocasionalmente.

Además, los préstamos informales pueden generar problemas de organización, pérdidas, demoras y falta de control.

**ToolShare CBA** propone una plataforma digital para gestionar herramientas, préstamos y devoluciones, permitiendo mejorar la organización de los recursos y generar información útil para la toma de decisiones.

---

## Funcionalidades principales

El sistema contempla las siguientes funcionalidades:

* Registro y administración de herramientas.
* Gestión de usuarios.
* Consulta de herramientas disponibles.
* Gestión de solicitudes de préstamo.
* Control de préstamos y devoluciones.
* Organización del inventario.
* Alertas relacionadas con vencimientos.
* Seguimiento e historial del uso de herramientas.
* Diferenciación de funcionalidades según el rol del usuario.

---

##  Tecnologías utilizadas

### Frontend

* Angular 22
* TypeScript
* HTML5
* CSS3
* Bootstrap 5
* Angular Router
* Reactive Forms

### Control de versiones

* Git
* GitHub

---

##  Estructura del proyecto

```text
Inventory-App-FullStack/
│
├── backend/
│
├── frontend/
│   └── ToolShareCBA/
│       ├── public/
│       ├── src/
│       │   ├── app/
│       │   │   ├── pages/
│       │   │   ├── shared/
│       │   │   ├── app.ts
│       │   │   ├── app.html
│       │   │   ├── app.routes.ts
│       │   │   └── app.config.ts
│       │   │
│       │   └── styles.css
│       │
│       ├── angular.json
│       ├── package.json
│       └── tsconfig.json
│
├── maqueta/
│   └── Maquetación HTML/CSS de referencia
│
└── README.md
```

---

##  Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/ByteBuildersCba/Inventory-App-FullStack.git
```

### 2. Acceder al frontend Angular

```bash
cd Inventory-App-FullStack/frontend/ToolShareCBA
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Ejecutar el servidor de desarrollo

```bash
ng serve
```

También puede utilizarse:

```bash
npm start
```

Luego abrir en el navegador:

```text
http://localhost:4200/
```

La aplicación se actualiza automáticamente al modificar el código durante el desarrollo.

---

##  Navegación de la aplicación

La aplicación utiliza Angular Router para gestionar la navegación como una SPA (Single Page Application).

Entre las rutas principales se encuentran:

```text
/
 /home
 /quienes-somos
 /herramientas
 /login
 /registro
 /usuario/dashboard
 /usuario/gestion-prestamo
 /admin/dashboard
 /admin/inventario
 /admin/solicitudes
```

También se contempla una vista personalizada para rutas no encontradas (404).

---

##  Arquitectura del frontend

El frontend se organiza mediante componentes de Angular.

### Pages

Contiene las vistas principales de la aplicación:

```text
pages/
├── home/
├── quienes-somos/
├── herramientas/
├── login/
├── registro/
├── not-found/
├── usuario/
└── admin/
```

### Shared

Contiene componentes reutilizables entre distintas vistas:

```text
shared/
└── components/
    ├── navbar/
    └── footer/
```

Esta organización permite reutilizar elementos comunes y mantener el código modular.

---

##  Diseño responsive

La interfaz utiliza **Bootstrap** y estilos CSS propios para adaptarse a distintos tamaños de pantalla.

La aplicación está diseñada para funcionar en:

* Computadoras.
* Tablets.
* Dispositivos móviles.

---

##  Compilación

Para generar una compilación del proyecto:

```bash
ng build
```

Los archivos generados se almacenan en la carpeta `dist/`.

---

##  Integrantes

* Jeremías Exequiel Ayala
* Matías José Guillermo Aranda
* María Eugenia Barrios
* Luis David Flores
* Facundo Pedro Perez

---

##  Proyecto académico

Trabajo desarrollado para la **Tecnicatura Superior en Desarrollo de Software – ISPC**, correspondiente al módulo **Full Stack I (2026)**.

El proyecto parte de una maquetación estática previa y evoluciona hacia una aplicación web SPA desarrollada con Angular.

