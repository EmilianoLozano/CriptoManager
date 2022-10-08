import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Criptomoneda } from '../Models/Criptomoneda';

@Injectable({
  providedIn: 'root'
})
export class CriptomonedasService {

  constructor(private firestore: AngularFirestore) { }

  addCripto(cripto : Criptomoneda) {
    return this.firestore.collection('Criptomonedas').doc(cripto.simbolo).set(cripto);
  }

  getCriptos() : Observable<any>{
    return this.firestore.collection('Criptomonedas').snapshotChanges();
  }

 getCripto (simbolo:string) : Observable<any> {
  return this.firestore.collection('Criptomonedas').doc(simbolo).snapshotChanges();
 }

 updateCripto (simbolo:string,data:Criptomoneda)  {
  return this.firestore.collection('Criptomonedas').doc(simbolo).update(data);
 }

 deleteCripto(simbolo:string){
  return this.firestore.collection('Criptomonedas').doc(simbolo).delete();
 }


}
