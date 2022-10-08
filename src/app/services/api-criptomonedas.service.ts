import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiCriptomonedasService {
  
  cotizacionDolar:number;


  constructor(private http : HttpClient,) { }

  getCotizacionDolar(){
    return this.http.get("https://criptoya.com/api/cryptomkt/usdt/ars");
  }

  getCriptos(){
    return this.http.get("api/currency");
  }
  getCripto(simbolo:string){
    return this.http.get("api/currency/"+simbolo+"");
  }

  getPrecios(simbolo:string){
     return this.http.get("api/ticker/"+simbolo+"USDT");
  }

}
