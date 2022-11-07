import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, take } from 'rxjs';
import { Transaccion } from '../Models/Transaccion';



@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  constructor(private firestore:AngularFirestore) { }

  getMovimientos(billetera_id : string) : Observable<any>{
    return this.firestore.collection('Transacciones', ref => ref.where('billetera_id', '==', billetera_id)).valueChanges();
    
  }


  comprarCripto(transaccion : Transaccion) {
    return this.firestore.collection('Transacciones').add(transaccion);
  }

  venderCripto(transaccion : Transaccion) {
    return this.firestore.collection('Transacciones').add(transaccion);
  }

  getTransacciones(){
    return this.firestore.collection('Transacciones').valueChanges();
    
  }


  
  movimientoPesos(movimiento : any , email : any) {
    return this.firestore.collection('Movimientos_Pesos').doc(email).set(movimiento);
  }

  
  getMovimientoPesos(email:any){
    return this.firestore.collection('Movimientos_Pesos').doc(email).valueChanges().pipe(take(1));
    
  }


}
