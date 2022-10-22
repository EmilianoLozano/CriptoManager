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

  usuarios : any[] =[];
  usuario:Usuario;
  popUpBaja:boolean=false;
  public textoBaja:string;
 public uid:String;
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
        if(element.payload.doc.data()['email'] != "emilozano425@gmail.com"){
        // if(element.payload.doc.data()['email'] != this.auth.userDataEmail){
          let activo : string;
          if(element.payload.doc.data()['activo'])
            activo = "SÍ";
          else
            activo = "NO";
          this.usuarios.push({
            uid:element.payload.doc.id,
            activo : activo,
            nombre : element.payload.doc.data()['nombre'],
            apellido : element.payload.doc.data()['apellido'],
            dni : element.payload.doc.data()['dni'],
            email : element.payload.doc.data()['email'],
            role : element.payload.doc.data()['role'],
          });
        }
      }); 
   
    });
   
  }

  editUser(usuario:Usuario)
  {
    this.router.navigateByUrl('/dashboard/usuario/'+usuario.email+'');
  }

  modalBaja(usuario:Usuario){
    // Descomentar
    // const user = this.auth.userData;
    // console.log(user);
    // if(usuario.email != user.email)
    // {
    //   this.usuario=usuario;
    //   this.textoBaja = 'Está seguro que desea dar de baja la cuenta '+usuario.email+'?'
    //   this.popUpBaja=true;
    // }
  }

  bajaUsuario(){

      const user:any = {
        activo:false
      };
      
      this.usuarioService.updateUsuario(this.usuario.email,user).then(()=>{
        this.messageService.mensajeError('block1','success','Usuario Dado de Baja','Se dio de baja el usuario correctamente');
        this.popUpBaja=false;
      });
    //  deleteUser(data.payload.data()['uid']).then(() => { });
   
   
    // this.usuarioService.deleteUsuario(this.usuario.email).then(()=>{});
    
  }
}
