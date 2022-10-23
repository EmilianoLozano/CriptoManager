import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { docData, Firestore } from '@angular/fire/firestore';
import { collection, CollectionReference, doc, DocumentData } from 'firebase/firestore';
import { Observable, take } from 'rxjs';
import { Usuario } from '../Models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {


  constructor( private firestore: AngularFirestore
            ) { 

  }

  addUsuario(usuario : Usuario) {
    // set empleado con email de id de documento
    return this.firestore.collection('Usuarios').doc(usuario.email).set(usuario);
    // agregar con id autogenerado por firebase
    // const usuarioCollection = collection(this.firestore,'Usuarios');
    // return addDoc(usuarioCollection,usuario);
  }

  getUsuarios() : Observable<any>{
    return this.firestore.collection('Usuarios').snapshotChanges();
  }

 getUsuario (email:string) : Observable<any> {
  return this.firestore.collection('Usuarios').doc(email).snapshotChanges();
 }

 updateUsuario (email:string,data:Usuario)  {
  return this.firestore.collection('Usuarios').doc(email).update(data);
 }

 updateSaldo (email:string,data:any)  {
  return this.firestore.collection('Usuarios').doc(email).update(data);
 }

 deleteUsuario(email:string){
  return this.firestore.collection('Usuarios').doc(email).delete();
 }


 get(email:string){
  return this.firestore.collection('Usuarios').doc(email).valueChanges().pipe(take(1));
 }

}
