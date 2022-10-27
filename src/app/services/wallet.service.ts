import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { addDoc, collection, doc, getDoc } from '@angular/fire/firestore';
import { map, Observable, take } from 'rxjs';
import { Billetera } from '../Models/Billetera';


@Injectable({
  providedIn: 'root'
})
export class WalletService {
  monedas:any=[];
  ref: AngularFirestoreDocument<any>;
  
  constructor(private firestore: AngularFirestore) { }

  addWallet(billetera : Billetera) {
    return this.firestore.collection('Billetera').add(billetera);
  }

  getWallet(emailUsuario:string) : Observable<any>
  {
    return this.firestore.collection('Billetera', ref => ref.where('usuario', '==', emailUsuario)).valueChanges();
  }

  getWalletId(emailUsuario:string) : Observable<any>
  {
    return this.firestore.collection('Billetera', ref => ref.where('usuario', '==', emailUsuario)).get();
  }

  
 updateCripto (id:string,data:any)  {
  return this.firestore.collection('Billetera').doc(id).update(data);
 }


}
