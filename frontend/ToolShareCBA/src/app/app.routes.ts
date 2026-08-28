import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { QuienesSomos } from './pages/quienes-somos/quienes-somos';
import { Herramientas } from './pages/herramientas/herramientas';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { NotFound } from './pages/not-found/not-found';

import { Dashboard as UsuarioDashboard } from './pages/usuario/dashboard/dashboard';
import { GestionPrestamo } from './pages/usuario/gestion-prestamo/gestion-prestamo';

import { Dashboard as AdminDashboard } from './pages/admin/dashboard/dashboard';
import { Inventario } from './pages/admin/inventario/inventario';
import { Solicitudes } from './pages/admin/solicitudes/solicitudes';


export const routes: Routes = [
    { path: 'home', component: Home},
    { path: 'quienes-somos', component: QuienesSomos},
    { path: 'herramientas', component: Herramientas},
    { path: 'login', component: Login},
    { path: 'registro', component: Registro},
    { path: 'usuario/dashboard', component: UsuarioDashboard},
    { path: 'usuario/gestion-prestamo', component: GestionPrestamo},
    { path: 'admin/dashboard', component: AdminDashboard},
    { path: 'admin/inventario', component: Inventario},
    { path: 'admin/solicitudes', component: Solicitudes},
    { path: '**', component: NotFound }
];
