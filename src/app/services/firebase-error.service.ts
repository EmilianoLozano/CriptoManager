import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseErrorService {

  constructor() { }

   controlarErrorFirebase(code : string){
    switch (code){
      case 'auth/email-already-in-use' : 
        return 'El usuario ya se encuentra registrado.';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres.';
      case 'auth/invalid-email':
        return 'El email no tiene el formato correcto.';    
      case 'auth/wrong-password':
        return 'La contraseña ingresada es incorrecta.';
      case 'auth/user-not-found':
        return 'El usuario ingresado no esta registrado.'
      case 'auth/missing-email':
        return 'Debe ingresar el email de su cuenta.'
      default: return 'Error desconocido';
    }
  }

}
