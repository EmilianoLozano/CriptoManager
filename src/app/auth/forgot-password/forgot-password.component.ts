import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';
import { MessagesService } from 'src/app/services/messages.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {

  recuperacionExitosa:boolean=false;

  constructor(public authService: AuthService,
            private messageService:MessagesService,
            private firebase_error:FirebaseErrorService) { }

  ngOnInit(): void {
  }
  notify(email:string){
    this.recuperacionExitosa=false;
    this.authService.ForgotPassword(email).then(() => {

      this.messageService.mensajeEmail('block3','info','Recuperación Exitosa','Revise su casilla de correo para reestablecer la contraseña.');
    
      this.recuperacionExitosa=true;
    })
    .catch((error) => {
      this.messageService.mensajeError('block2','error','Error en la recuperación de contraseña',this.firebase_error.controlarErrorFirebase(error.code));
      this.recuperacionExitosa=false;
    });

  }
}
