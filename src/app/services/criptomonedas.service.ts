import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { delay, map, Observable, take } from 'rxjs';
import { Criptomoneda } from '../Models/Criptomoneda';
import { ApiCriptomonedasService } from './api-criptomonedas.service';

@Injectable({
  providedIn: 'root'
})
export class CriptomonedasService {

  criptos:any[] = [];
  indice : number =1;

  constructor(private firestore: AngularFirestore,
              private api_criptos:ApiCriptomonedasService) { }

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

 get(simbolo:string){
  return this.firestore.collection('Criptomonedas').doc(simbolo).valueChanges().pipe(take(1));
 }

 getVenta(){
  return this.firestore.collection('Criptomonedas').valueChanges()
    .pipe(take(1));
 }


 getOperables(){
  return this.firestore.collection('Criptomonedas').valueChanges()
    .pipe(take(1),
    map(resp=>{
      
      const array = resp.filter((x:any)=>{
        return x.isOperable == "SÍ"
      })
      return array;
    }));
 }

  getCriptosOperables(){
    this.criptos=[];
   return  this.firestore.collection('Criptomonedas').valueChanges()
    .pipe(take(1),
     map(
      resp=>{
        
        const array = resp.filter((x:any)=>{
          return x.isOperable == "SÍ"
        });
        debugger;
        array.forEach((element:any) => {
          if(element.simbolo != "USDT"){
            this.api_criptos.getPrecios(element.simbolo).subscribe((data:any)=>{
              const variacion = ((data.ask - data.open)/data.open)*100;
              this.criptos.push({...element,
                variacion : variacion});
            });
          }
          else{
              this.criptos.push({...element,
                variacion : 0 });
          }
          if(this.indice == array.length)
          {
            return;
          }
          else
          {
            this.indice++;
          }
        });
          
         return  this.criptos;   
        
      }
     ))
 }

}
