import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  constructor(private firestore:AngularFirestore) { }

  getMovimientos(billetera_id : string) : Observable<any>{
    return this.firestore.collection('Transacciones', ref => ref.where('billetera_id', '==', billetera_id)).valueChanges();
    
  }




}
