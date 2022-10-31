import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RouterLinkActive} from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/Models/Usuario';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  mostrarMenu:boolean=false;
  loading:boolean = false;
  rol:any;
  usuarioAutenticado:any;
  constructor(private usuarioService:UsuariosService) {
    this.usuarioAutenticado=localStorage.getItem('email');
    this.usuarioService.get(this.usuarioAutenticado).subscribe((data:any)=>{
      if(data.role=="ADMIN_ROLE")
      {
        this.mostrarMenu=true;
      }
    })
    // this.rol= localStorage.getItem('rol');

    // if(this.rol =="ADMIN_ROLE"){
      
    // }
    // this.mostrarMenu=false;
  }

  ngOnInit(): void {

  }

}
