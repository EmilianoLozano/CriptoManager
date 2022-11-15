import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PrimeNgModule } from '../primeModule/prime-ng.module';
import { StyleClassModule } from 'primeng/styleclass';
import { PreguntasComponent } from './preguntas/preguntas.component';

@NgModule({
  declarations: [  
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    PreguntasComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PrimeNgModule,
    StyleClassModule
  ],
  exports:[  
    SidebarComponent,
    NavbarComponent,
    FooterComponent,

  ]
})
export class SharedModule { }
