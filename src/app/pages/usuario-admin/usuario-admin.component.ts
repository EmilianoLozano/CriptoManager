import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Models/Usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { deleteUser } from 'firebase/auth';
import { MessagesService } from 'src/app/services/messages.service';
import { user } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-usuario-admin',
  templateUrl: './usuario-admin.component.html',
  styleUrls: ['./usuario-admin.component.scss']
})
export class UsuarioAdminComponent implements OnInit {

  usuarios : Usuario[] =[];
  usuario:Usuario;
  popUpBaja:boolean=false;
  public textoBaja:string;

  constructor(private usuarioService:UsuariosService,
            private auth:AuthService,
            private messageService:MessagesService,
            private router:Router
            ) { 
    this.getUsuarios();
  }

  ngOnInit(): void {
  }

  getUsuarios(){
    this.usuarioService.getUsuarios().subscribe(data=>{
      this.usuarios=[];
      data.forEach((element:any) => {
        this.usuarios.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        });
      }); 
    });
  }

  editUser(usuario:Usuario)
  {
      this.router.navigateByUrl('/dashboard/usuario/'+usuario.email+'');
  }

  modalBaja(usuario:Usuario){
    const user = this.auth.userData;
    console.log(user);
    if(usuario.email != user.email)
    {
      this.usuario=usuario;
      this.textoBaja = 'Está seguro que desea dar de baja la cuenta '+usuario.email+'?'
      this.popUpBaja=true;
    }
  }

  bajaUsuario(){
    const user : any= {
      email:this.usuario.email  
    };
     deleteUser(user).then(() => { })
     .catch((error) => {
      console.log(error);
     });
    this.messageService.mensajeError('block1','success','Usuario Eliminado','Se eliminó el usuario correctamente');
    this.popUpBaja=false;
    this.usuarioService.deleteUsuario(this.usuario.email).then(()=>{});
  }
}
