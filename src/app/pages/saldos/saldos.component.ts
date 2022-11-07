import { Component, OnInit } from '@angular/core';
import { ApiCriptomonedasService } from 'src/app/services/api-criptomonedas.service';
import { AuthService } from 'src/app/services/auth.service';
import { CriptomonedasService } from 'src/app/services/criptomonedas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-saldos',
  templateUrl: './saldos.component.html',
  styleUrls: ['./saldos.component.scss']
})
export class SaldosComponent implements OnInit {
  timestamp:number;

  monedas:any[]=[];
  loading:boolean=false;
  usuarioAutenticado : any;
  saldo:number;
  saldoCripto:number = 0;
  total : number = 0;
  cotDolar : any = localStorage.getItem('dolar');
  indice:number=1;

  constructor(private walletService:WalletService,
            private authService:AuthService,
            private criptomonedasService:CriptomonedasService,
            private api_cripto : ApiCriptomonedasService,
            private usuarioService:UsuariosService) 
    {
    this.loading=true;
    this.usuarioAutenticado = localStorage.getItem('email');
    this.usuarioService.get(this.usuarioAutenticado).subscribe((data:any)=>{
      this.saldo=data.saldo;

      this.walletService.getWallet(this.usuarioAutenticado).subscribe((data:any)=>{
      
        this.monedas = data[0].monedas;
        if(this.monedas.length == 0)
        {
          this.loading=false;
          return;
        }
        this.calcularSaldoCripto(this.monedas);
  
      });
      
    });

  

   }

  ngOnInit(): void {
  }


  calcularSaldoCripto(monedas:any){
    monedas.forEach((element:any) => {
      if(element.cripto == "USDT" || element.cripto == "DAI")
      {
        this.saldoCripto += (element.cantidad * Number(this.cotDolar));
        if(this.indice == monedas.length)
        {
          this.calcularTotal();
          this.loading=false;
        }
        else
        {
          this.indice++;
        }
      }
      else{
      this.api_cripto.getPrecios(element.cripto).subscribe((data:any)=>{
        this.saldoCripto += (element.cantidad * Number(data.bid) * Number(this.cotDolar));
        if(this.indice == monedas.length)
        {
          this.calcularTotal();
          this.loading=false;
        }
        else
        {
          this.indice++;
        }
      });
     }
    });
  }

  calcularTotal(){
    this.total =  this.saldoCripto + this.saldo;
  }

}
