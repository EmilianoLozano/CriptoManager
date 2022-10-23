import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RouterLinkActive} from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  mostrarMenu:boolean=false;
  loading:boolean = false;
  rol:any;
  constructor(public authService:AuthService,
              public usuarioService : UsuariosService) {
                this.rol= localStorage.getItem('rol');
               
               }

  ngOnInit(): void {
      if(this.rol =="ADMIN_ROLE"){
        this.mostrarMenu=true;
        // this.mostrarMenu=true;
      }
      this.mostrarMenu=true;
  }

}
