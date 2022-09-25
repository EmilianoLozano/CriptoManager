import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
  }

  controlarErrorFirebase(code : string){
    switch (code){
      case 'auth/wrong-password' : 
        return 'La contraseña es incorrecta.';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres.';
      case 'auth/invalid-email':
        return 'El email no tiene el formato correcto.';
      default: return 'Error desconocido';
    }
  }

}
