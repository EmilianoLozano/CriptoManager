import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { InicioComponent } from './inicio/inicio.component';
import { ComprarComponent } from './comprar/comprar.component';
import { VenderComponent } from './vender/vender.component';
import { SaldosComponent } from './saldos/saldos.component';
import { IngresoComponent } from './ingreso/ingreso.component';
import { RetiroComponent } from './retiro/retiro.component';
import { CriptomonedasComponent } from './criptomonedas/criptomonedas.component';
import { AsesoriasComponent } from './asesorias/asesorias.component';
import { UsuarioAdminComponent } from './usuario-admin/usuario-admin.component';
import { UsuarioEditAdminComponent } from './usuario-edit-admin/usuario-edit-admin.component';
import { CriptoComponent } from './criptomonedas/cripto.component';
import { SuccessComponent } from './success/success.component';
import { AdminGuard } from '../guards/admin.guard';
import { ComprarCriptoComponent } from './comprar/comprar-cripto.component';
import { VenderCriptoComponent } from './vender/vender-cripto.component';
import { VelasVariableComponent } from './reportes/velas-variable.component';
import { PopularesComponent } from './reportes/populares.component';
import { BalanceCuentaComponent } from './reportes/balance-cuenta.component';
import { PopularesXusuarioComponent } from './reportes/populares-xusuario.component';
import { UsuariosXfechaComponent } from './reportes/usuarios-xfecha.component';


const routes: Routes = [
    { 
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '',redirectTo:'/dashboard/inicio',pathMatch:'full' },
            { path: 'inicio', component: InicioComponent},
            { path: 'usuario', component: UsuarioComponent},
            { path: 'billetera', redirectTo:'/dashboard/billetera/comprar',pathMatch:'full'},
            { path: 'billetera/comprar', component: ComprarComponent},
            { path: 'billetera/comprar/:simbolo', component: ComprarCriptoComponent},
            { path: 'billetera/vender', component: VenderComponent},
            { path: 'billetera/vender/:simbolo', component: VenderCriptoComponent},
            { path: 'billetera/saldos', component: SaldosComponent},
            { path: 'ingreso', component: IngresoComponent} ,
            { path: 'retiro', component: RetiroComponent},
            { path: 'asesorias', component: AsesoriasComponent}, 
            { path: 'success', component: SuccessComponent},
            { path: 'informes/criptomonedas', component: VelasVariableComponent},
            { path: 'informes/populares', component: PopularesComponent},
            { path: 'informes/balance', component: BalanceCuentaComponent},
            // Rutas de Admin
            { path: 'criptomonedas', component: CriptomonedasComponent , canActivate: [ AdminGuard ] } ,
            { path: 'criptomoneda/:symbol', component: CriptoComponent , canActivate: [ AdminGuard ]} ,
            { path: 'usuario_admin',component: UsuarioAdminComponent , canActivate: [ AdminGuard ]},
            { path: 'usuarioAdmin/:email', component: UsuarioEditAdminComponent , canActivate: [ AdminGuard ]},
            { path: 'informes/populares_usuario', component: PopularesXusuarioComponent, canActivate: [ AdminGuard ]},
            { path: 'informes/usuarios', component: UsuariosXfechaComponent, canActivate: [ AdminGuard ]},
            // { path: 'criptomonedas', component: CriptomonedasComponent  } ,
            // { path: 'criptomoneda/:symbol', component: CriptoComponent } ,
            // { path: 'usuario_admin',component: UsuarioAdminComponent },
            // { path: 'usuarioAdmin/:email', component: UsuarioEditAdminComponent },
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


