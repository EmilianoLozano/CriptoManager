import { Component, OnInit } from '@angular/core';
import { ApiCriptomonedasService } from 'src/app/services/api-criptomonedas.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  loading:boolean=true;
  constructor(private api : ApiCriptomonedasService) {
    setTimeout(() => {
      this.loading=false;
    }, 10);
   }

  ngOnInit(): void {

    this.api.getCripto("BTC").subscribe(data=>{
      console.log(data);
    })

  }


  
 

}
