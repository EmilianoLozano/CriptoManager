import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Transaccion } from '../Models/Transaccion';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private firestore: AngularFirestore) { }


  comprarCripto(transaccion : Transaccion) {
    return this.firestore.collection('Transacciones').add(transaccion);
  }



}
