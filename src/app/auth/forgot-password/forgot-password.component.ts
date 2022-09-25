import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  recuperacionExitosa:boolean=false;

  constructor(public authService: AuthService,
            private messageService:MessageService,
            private router:Router) { }

  ngOnInit(): void {
  }
  notify(email:string){
    this.recuperacionExitosa=false;
    this.authService.ForgotPassword(email).then(() => {
      this.messageService.clear();
      this.messageService.add({
          key: 'block3',
          severity: 'custom-3',
          summary: 'Registro Exitoso',
          detail: 'Revise su casilla de correo para verificar email.',
          styleClass: 'surface-overlay',
          contentStyleClass: 'p-3',
          closable: false
      })
      this.recuperacionExitosa=true;
    })
    .catch((error) => {
      window.alert("Se produjo un error en la solicitud de cambio de contraseña.");
    });

  }
}
