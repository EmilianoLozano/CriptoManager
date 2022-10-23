import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PrimeNgModule } from '../primeModule/prime-ng.module';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {  StyleClassModule } from 'primeng/styleclass';
import { InicioComponent } from './inicio/inicio.component';
import { CriptomonedasComponent } from './criptomonedas/criptomonedas.component';
import { ComprarComponent } from './comprar/comprar.component';
import { VenderComponent } from './vender/vender.component';
import { SaldosComponent } from './saldos/saldos.component';
import { IngresoComponent } from './ingreso/ingreso.component';
import { RetiroComponent } from './retiro/retiro.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioAdminComponent } from './usuario-admin/usuario-admin.component';
import { AsesoriasComponent } from './asesorias/asesorias.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioEditAdminComponent } from './usuario-edit-admin/usuario-edit-admin.component';
import { CriptoComponent } from './criptomonedas/cripto.component';
import { SuccessComponent } from './success/success.component';
import { ComprarCriptoComponent } from './comprar/comprar-cripto.component';
import { NgApexchartsModule } from "ng-apexcharts";


@NgModule({
  declarations: [
    LandingComponent,
    DashboardComponent,
    InicioComponent,
    CriptomonedasComponent,
    ComprarComponent,
    VenderComponent,
    SaldosComponent,
    IngresoComponent,
    RetiroComponent,
    UsuarioComponent,
    UsuarioAdminComponent,
    AsesoriasComponent,
    NopagefoundComponent,
    UsuarioEditAdminComponent,
    CriptoComponent,
    SuccessComponent,
    ComprarCriptoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PrimeNgModule,
    StyleClassModule,
    ReactiveFormsModule,
    FormsModule,
    NgApexchartsModule
  ],
  exports:[
    LandingComponent,
    DashboardComponent,
    SharedModule,
    InicioComponent,
    CriptomonedasComponent,
    ComprarComponent,
    VenderComponent,
    SaldosComponent,
    IngresoComponent,
    RetiroComponent,
    UsuarioComponent,
    UsuarioAdminComponent,
    AsesoriasComponent,
    NopagefoundComponent
  ]
})
export class PagesModule { }
