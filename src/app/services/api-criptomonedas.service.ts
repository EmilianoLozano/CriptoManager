import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiCriptomonedasService {
  
  cotizacionDolar:number;
  url = "api";

  constructor(private http : HttpClient,) { }


  

  getCotizacionDolar(){
    return this.http.get("https://criptoya.com/api/cryptomkt/usdt/ars");
  }

  getCriptos(){
    return this.http.get( this.url +"/currency");
  }


  // async getCriptoasds(){
  //   return await fetch( this.url +"/currency");
  // }

  getCripto(simbolo:string){
    return this.http.get(this.url +"/currency/"+simbolo+"");
  }

  getPrecios(simbolo:string){
     return this.http.get(this.url +"/ticker/"+simbolo+"USDT");
  }

  conectarApiCandles(simbolo: string ){
    return this.http.get<any>(this.url +"/candles/"+simbolo+"usdt?period=D1&limit=90");
  } 

  conectarApiCandlesPorPeriodo(simbolo: string , periodo:string ){
    return this.http.get<any>(this.url +"/candles/"+simbolo+"usdt?period="+periodo+"&limit=100");
  } 

}
