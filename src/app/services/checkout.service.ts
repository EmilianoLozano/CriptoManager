import { Injectable } from '@angular/core';

import { getFunctions, httpsCallable } from "firebase/functions";
import { AngularFireFunctions } from '@angular/fire/compat/functions';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private fns: AngularFireFunctions) { 
  }

  goCheckOut(products:any) {

    const CheckOut = this.fns.httpsCallable('checkout');
    return  CheckOut(products);

    // const functions = getFunctions();
    // const CheckOut = httpsCallable(functions, 'checkout');
    
    // console.log(CheckOut);
    // console.log(functions);
    // //const CheckOut = .httpsCallable('checkout');
    // return  CheckOut(products);
  }
  
}