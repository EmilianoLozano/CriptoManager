import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { deleteUser } from 'firebase/auth';
import { doc, DocumentData, DocumentReference } from 'firebase/firestore';
import { delay } from 'rxjs';
import { Usuario } from 'src/app/Models/Usuario';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  public usuarioForm : FormGroup;
  public email : string;
  //public email : string = 'emilozano425@hotmail.com';
  bajarActivo:boolean=false;

  public saldo : number;
  public popUpBaja : boolean= false;
  constructor(private fb: FormBuilder, private auth : AuthService, 
              private usuarioService : UsuariosService,
              private messageService:MessagesService,
              private router: Router ) { 

    this.email = auth.userDataEmail;

    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required ],
      apellido:['', Validators.required ],
      dni:['', Validators.required ],
      domicilio : '',
      telefono:''
    });
    this.cargarDatos();
  }

  ngOnInit(): void {
  }

  guardarCambios(){

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
  cargarDatos(){
      this.usuarioService.getUsuario(this.email).subscribe(data=>{
        this.usuarioForm.setValue({
          nombre:data.payload.data()['nombre'],
          apellido:data.payload.data()['apellido'],
          dni:data.payload.data()['dni'],
          domicilio:data.payload.data()['domicilio'],
          telefono:data.payload.data()['telefono'],
        });
        this.saldo=data.payload.data()['saldo'];
      });
  }

  confirmBaja(){
    this.popUpBaja=true;
  }
  bajaUsuario(){
    
      const usuario = this.auth.userData;

      let UsuarioFirestore : Usuario;
      UsuarioFirestore={
        activo:false,
        ...this.usuarioForm.value,
      };
    
      this.usuarioService.deleteUsuario(this.email).then(()=>{
        this.bajarActivo=true;
      });
      // this.usuarioService.updateUsuario(this.email,UsuarioFirestore).then(()=>{
      // this.bajarActivo=true;
      // });
      if(this.bajarActivo){
      deleteUser(usuario).then(() => {
        this.router.navigateByUrl('/inicio');
      }).catch((error) => {});
      }
  
  }

}
