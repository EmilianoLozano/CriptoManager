import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor( public authService: AuthService,private messageService: MessageService,
              ) { }

  ngOnInit(): void {
  }

  notify3(user:string,password:string,passwordConfirm:string) {
    console.log(user + '-' + password );
    if(password!=passwordConfirm)
    {
      window.alert("Las contraseñas no coinciden");
      return;
    }
    this.authService.SignUp(user,password) .then((result) => {
    
    this.authService.SendVerificationMail();
    this.authService.SetUserData(result.user);
      
    this.messageService.clear();
    this.messageService.add({
        key: 'block3',
        severity: 'custom-3',
        summary: 'Registro Exitoso',
        detail: 'Revise su casilla de correo para verificar email.',
        styleClass: 'surface-overlay',
        contentStyleClass: 'p-3',
        closable: false
    });
    })
    .catch((error) => {
      this.messageService.clear();
      this.messageService.add({
          key: 'block2',
          severity: 'error',
          summary: 'Error en registro',
          detail: this.controlarErrorFirebase(error.code),
          contentStyleClass: 'p-3',
          closable:false
      });
    });

}

controlarErrorFirebase(code : string){
  switch (code){
    case 'auth/email-already-in-use' : 
      return 'El usuario ya se encuentra registrado.';
    case 'auth/weak-password':
      return 'La contraseña debe tener al menos 6 caracteres.';
    case 'auth/invalid-email':
      return 'El email no tiene el formato correcto.';
    default: return 'Error desconocido';
  }


}

}
