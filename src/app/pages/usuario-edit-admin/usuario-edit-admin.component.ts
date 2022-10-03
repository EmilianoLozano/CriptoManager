import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Usuario } from 'src/app/Models/Usuario';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';
import { MessagesService } from 'src/app/services/messages.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuario-edit-admin',
  templateUrl: './usuario-edit-admin.component.html',
  styleUrls: ['./usuario-edit-admin.component.scss']
})
export class UsuarioEditAdminComponent implements OnInit {

  public usuarioForm : FormGroup;
  public email : string;
  public saldo : number;
  public popUpBaja : boolean= false;
  public roles:any[]=[];
  public esNuevo:boolean=false;

  constructor(private fb:FormBuilder,private auth : AuthService, 
            private usuarioService : UsuariosService,
            private messageService:MessagesService,
            private router: Router,
            private aR : ActivatedRoute,
            private firebase_error:FirebaseErrorService) { 
              this.usuarioForm = this.fb.group({
                email: ['', Validators.required ],
                nombre: ['', Validators.required ],
                apellido:['', Validators.required ],
                dni:['', Validators.required ],
                domicilio : '',
                telefono:'',
                role:['', Validators.required ]
              });
              this.email = aR.snapshot.params['email'];
              if(this.email!='nuevo'){
                this.cargarDatos();
                this.esNuevo=false;
              }
              else{
                this.esNuevo=true;
              }
            }

  ngOnInit(): void {
    this.roles = [
      {nombre: 'Seleccione rol de usuario', value: ''},
      {nombre: 'USUARIO', value: 'USER_ROLE'},
      {nombre: 'ADMIN', value: 'ADMIN_ROLE'}
  ];
  }

  guardarCambios(){

    if(!this.esNuevo)
    {
      const usuario:Usuario =this.usuarioForm.value;

      if(this.usuarioForm.valid)
      {
      this.usuarioService.updateUsuario(this.email,usuario);
      this.messageService.mensajeError('block1','success','Actualización exitosa','Se actualizaron los datos correctamente.');
      }
      else
      {
      this.messageService.mensajeError('block2','error','Error en actualización','Complete los datos solicitados');
      }
    }
    else{
     
        this.auth.SignUp(this.usuarioForm.get('email')?.value,'Criptomanager123') .then((result) => {

        this.auth.SendVerificationMail();
        this.messageService.mensajeError('block1','success','Registro Exitoso','Se realizó el registro con éxito.Recordar verificar email.'); 
        const usuarioNuevo:Usuario =this.usuarioForm.value;
        console.log(usuarioNuevo);
        this.addUsuario(usuarioNuevo);

        })
        .catch((error) => {
          this.messageService.mensajeError('block2','error','Error en registro',this.firebase_error.controlarErrorFirebase(error.code));
        });
    }
  }

  cargarDatos(){

    this.usuarioService.getUsuario(this.email).subscribe(data=>{
      console.log(data.payload.data());
      this.usuarioForm.setValue({
        nombre:data.payload.data()['nombre'],
        apellido:data.payload.data()['apellido'],
        email:data.payload.data()['email'],
        dni:data.payload.data()['dni'],
        domicilio:data.payload.data()['domicilio'],
        telefono:data.payload.data()['telefono'],
        role:data.payload.data()['role'],
      });
      
    });
}

addUsuario(usuario : Usuario){
  return this.usuarioService.addUsuario(usuario);
}

}