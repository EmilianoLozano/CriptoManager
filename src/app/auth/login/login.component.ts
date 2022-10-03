import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(public authService:AuthService,private firebase_error:FirebaseErrorService,
            private router:Router,private messageService:MessagesService) { }

  ngOnInit(): void {
  }

  iniciarSesion(email : string , password : string){
  if(password=="")
  {
    this.messageService.mensajeError('block2','error','Error en inicio de sesión','Por favor ingrese una contraseña.');
    return;
  }
    this.authService.SignIn(email,password)
      .then((result) => {
        if(!result.user?.emailVerified){
          this.messageService.mensajeError('block2','error','Error en inicio de sesión','Debe verificar su usuario. Revisa tu casilla de correo.');
          return;
        }
      
        this.authService.afAuth.authState.subscribe((user) => {
          if (user) {
            
            this.router.navigate(['dashboard/inicio']);
          }
        });
      })
      .catch((error) => {
        this.messageService.mensajeError('block2','error','Error en inicio de sesión',this.firebase_error.controlarErrorFirebase(error.code));
      });
  }
}
