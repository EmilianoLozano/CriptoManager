import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';
import { Usuario } from 'src/app/Models/Usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { WalletService } from 'src/app/services/wallet.service';
import { Billetera } from 'src/app/Models/Billetera';

//import { collection, addDoc } from 'firebase/firestore';
//import { collection, } from "firebase/firestore";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  public usuarioForm: FormGroup;
  isPosted:boolean=false;

  constructor( public authService: AuthService,private messageService: MessagesService,
               private firebase_error : FirebaseErrorService,
               private fb: FormBuilder,
               private usuarioService:UsuariosService,
               private walletService:WalletService,
              ) { 
                this.usuarioForm = this.fb.group({
                  nombre: ['', Validators.required ],
                  apellido:['', Validators.required ],
                  dni:['', Validators.required ],
                  email:['', Validators.required ],
                  pass : ['', Validators.required ],
                  passConfirm : ['', Validators.required ],
                  saldo: 0,
                  role:'USER_ROLE',
                  domicilio : '',
                  telefono:'',
                  activo:true
                });
              }

  ngOnInit(): void {
    console.log(this.usuarioForm);

  }

  guardarUsuario() {
    this.isPosted=true;
    if(this.usuarioForm.invalid)
    {
      this.messageService.mensajeError('block2','error','Error Registro','Complete todos los datos del formulario');
      return;
    }
    if(this.usuarioForm.controls["pass"].value ==="")
    {
      this.messageService.mensajeError('block2','error','Error en registro','Debe ingresar una contraseña');
      return;
    }
    if(this.usuarioForm.controls["pass"].value != this.usuarioForm.controls["passConfirm"].value )
    {
      this.messageService.mensajeError('block2','error','Error en registro','Las contraseñas no coinciden');
      return;
    }
    this.authService.SignUp(this.usuarioForm.get('email')?.value,this.usuarioForm.controls["pass"].value).then((result:any) => {
    this.authService.SendVerificationMail();
    this.messageService.mensajeEmail('block3','info','Registro Exitoso','Revise su casilla de correo para verificar email.') 

    const usuario:Usuario ={
      uid: result.user.uid,
      ...this.usuarioForm.value};

    this.usuarioService.addUsuario(usuario);

    const fecha = Date.now();
    
    const billetera : Billetera= {
      fecha_alta : new Date(fecha),
      usuario : usuario.email,
      monedas:[]
    };

    this.walletService.addWallet(billetera);
    this.isPosted=false;
    this.usuarioForm.reset();
    })
    .catch((error) => {
      this.messageService.mensajeError('block2','error','Error en registro',this.firebase_error.controlarErrorFirebase(error.code));
    });

}



}
