import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, take } from 'rxjs';
import { Transaccion } from '../Models/Transaccion';



@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  constructor(private firestore:AngularFirestore) { }

  getMovimientos(emailUsuario : string) : Observable<any>{
    return this.firestore.collection('Transacciones', ref => ref.where('emailUsuario', '==', emailUsuario)).valueChanges();
    
  }

  getMovimientos10(emailUsuario : string) : Observable<any>{
    return this.firestore.collection('Transacciones', ref => ref.where('emailUsuario', '==', emailUsuario).limit(10)).valueChanges();
    
  }

  getMovimientosPopulares(emailUsuario : string) : Observable<any>{
    return this.firestore.collection('Transacciones', ref => ref.where('emailUsuario', '==', emailUsuario)).get();
    
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

  getTransaccionesPopulares(){
    return this.firestore.collection('Transacciones').get().toPromise();
    
  }


  getTransaccionesPorFecha_Usuario( fechaDesde : Date,fechaHasta : Date){
    
    return this.firestore.collection('Transacciones', ref =>
    ref.where('fecha', '>', fechaDesde)
       .where('fecha', '<' , fechaHasta)
       .orderBy('fecha','desc') ).valueChanges();
  }

  
  getTransaccionesPorFecha_UsuarioGet( fechaDesde : Date,fechaHasta : Date){

    return this.firestore.collection('Transacciones', ref =>
    ref.where('fecha', '>=', fechaDesde)
       .where('fecha', '<=' , fechaHasta)
       .orderBy('fecha','desc') ).get();
  }

  
  movimientoPesos(movimiento : any , email : any) {
    return this.firestore.collection('Movimientos_Pesos').doc(email).set(movimiento);
  }

  
  getMovimientoPesos(email:any){
    return this.firestore.collection('Movimientos_Pesos').doc(email).valueChanges().pipe(take(1));
    
  }

  getMovimientoPesosPorFecha(email:string ){

    return this.firestore.collection('Movimientos_Pesos').doc(email).valueChanges();
  }
  

}
