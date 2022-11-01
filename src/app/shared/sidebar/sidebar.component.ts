import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Input () mostrarMenu: boolean;


  loading:boolean = false;
  rol:any;
  usuarioAutenticado:any;
  constructor(private usuarioService:UsuariosService) {
    
  }

  ngOnInit(): void {

  }

}
