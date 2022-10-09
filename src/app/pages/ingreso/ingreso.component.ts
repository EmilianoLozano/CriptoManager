import { Component, OnInit } from '@angular/core';

import { CheckoutService } from '../../services/checkout.service';

import { get } from 'scriptjs';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.scss']
})
export class IngresoComponent implements OnInit {

  init_point: any;
  
  preference = {
    items: [
        {
            title: 'Pesos',
            unit_price: 10000,
            quantity: 1,
        }
    ]
  };

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit(): void {

    get("https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js", () => {
      //library has been loaded...
    });
  }

  onBuy() {
    this.checkoutService.goCheckOut(this.preference).subscribe((result:any) => {
      // Read result of the Cloud Function.
      this.init_point = result.result;
      console.log(this.init_point);
      
      window.open(this.init_point);
    });
  }


}
