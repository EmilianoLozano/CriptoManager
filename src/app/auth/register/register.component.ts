import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';
import { Firestore,collection, addDoc } from '@angular/fire/firestore';
import { doc, setDoc } from "firebase/firestore";
import { Usuario } from 'src/app/Models/Usuario';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
//import { collection, addDoc } from 'firebase/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  public usuarioForm: FormGroup;

  constructor( public authService: AuthService,private messageService: MessagesService,
               private firebase_error : FirebaseErrorService,
               private fb: FormBuilder,
               private usuarioService:UsuariosService
              ) { 
                this.usuarioForm = this.fb.group({
                  nombre: ['', Validators.required ],
                  apellido:['', Validators.required ],
                  dni:['', Validators.required ],
                  email:['', Validators.required ],
                  saldo:[0],
                  role:'USER_ROLE',
                  domicilio : '',
                  telefono:''
                });
              }

  ngOnInit(): void {
    console.log(this.usuarioForm);
  }

  guardarUsuario(password:string,passwordConfirm:string) {
    if(this.usuarioForm.invalid)
    {
      this.messageService.mensajeError('block2','error','Error Registro','Complete todos los datos del formulario');
      return;
    }
    if(password==="")
    {
      this.messageService.mensajeError('block2','error','Error en registro','Debe ingresar una contraseña');
      return;
    }
    if(password!=passwordConfirm)
    {
      this.messageService.mensajeError('block2','error','Error en registro','Las contraseñas no coinciden');
      return;
    }
    this.authService.SignUp(this.usuarioForm.get('email')?.value,password) .then((result) => {
    
    this.authService.SendVerificationMail();
    this.messageService.mensajeEmail('block3','custom-3','Registro Exitoso','Revise su casilla de correo para verificar email.') 
    const usuario:Usuario =this.usuarioForm.value;
    
    this.addUsuario(usuario);
    })
    .catch((error) => {
      this.messageService.mensajeError('block2','error','Error en registro',this.firebase_error.controlarErrorFirebase(error.code));
    });

}

addUsuario(usuario : Usuario){
  return this.usuarioService.addUsuario(usuario);
}


}
