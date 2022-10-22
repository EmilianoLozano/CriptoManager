import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RouterLinkActive} from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  rolUser:string;
  mostrarMenu:boolean=false;
  constructor(public authService:AuthService,
              public usuarioService : UsuariosService) {
             

               }

  ngOnInit(): void {
    this.usuarioService.get(this.authService.userDataEmail).subscribe((data:any)=>{
      this.rolUser=data.role;
      if(this.rolUser=="ADMIN_ROLE"){
        this.mostrarMenu=true;
      }
  });
  
  }

}
