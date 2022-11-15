import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiCriptomonedasService } from 'src/app/services/api-criptomonedas.service';
import { AuthService } from 'src/app/services/auth.service';
import { CriptomonedasService } from 'src/app/services/criptomonedas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { WalletService } from 'src/app/services/wallet.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-saldos',
  templateUrl: './saldos.component.html',
  styleUrls: ['./saldos.component.scss']
})
export class SaldosComponent implements OnInit, OnDestroy {
  timestamp:number;

  monedas:any[]=[];
  monedas2:any[]=[];
  loading:boolean=false;
  usuarioAutenticado : any;
  saldo:number;
  saldoCripto:number = 0;
  total : number = 0;
  cotDolar : any = localStorage.getItem('dolar');
  indice:number=1;
  valorPesosDeCripto:number;
  saldoIndividual:number = 0;
  subs$:Subscription;
  subs$2:Subscription;
  constructor(private walletService:WalletService,
            private authService:AuthService,
            private criptomonedasService:CriptomonedasService,
            private api_cripto : ApiCriptomonedasService,
            private usuarioService:UsuariosService) 
    {
    this.loading=true;
    this.usuarioAutenticado = localStorage.getItem('email');
     this.subs$2= this.usuarioService.get(this.usuarioAutenticado).subscribe((data:any)=>{
      this.saldo=data.saldo;

      this.walletService.getWallet(this.usuarioAutenticado).subscribe((data:any)=>{

        if(!data[0].monedas || data[0].monedas.length == 0)
        {
          this.loading=false;
          return;
        }
        console.log(data);
        data[0].monedas.forEach((element:any) => {
          
          this.monedas.push({
            cantidad:element.cantidad,
            cripto:element.cripto,
            imagen : element.imagen,
            nombre : element.nombre,
            valorEnPesos: element.precioCompra,
            precioPromedio: element.precioCompra
          });

          if(this.indice==data[0].monedas.length)
          {
            this.calcularSaldoCripto(this.monedas);
          }
          else
          {
            this.indice++;
          }

        });
        


  
      });
      
    });

  

   }
  ngOnDestroy(): void {
    if(this.subs$)
      this.subs$.unsubscribe();
    if(this.subs$2)
      this.subs$2.unsubscribe();
  }

  ngOnInit(): void {
  }


  calcularSaldoCripto(monedas:any){
    this.indice=1;

    monedas.forEach((element:any) => {
      if(element.cripto == "USDT" || element.cripto == "DAI")
      {
        this.saldoCripto += (element.cantidad * Number(this.cotDolar));
        this.saldoIndividual = (element.cantidad * Number(this.cotDolar));

        this.monedas2.push({...element,
          valorActual:this.saldoIndividual,
          diferencia: Number((this.saldoIndividual - element.valorEnPesos ).toFixed(2))});

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
      this.subs$ = this.api_cripto.getPrecios(element.cripto).subscribe((data:any)=>{
        this.saldoCripto += (element.cantidad * Number(data.bid) * Number(this.cotDolar));
        this.saldoIndividual = (element.cantidad * Number(data.bid) * Number(this.cotDolar));
        this.monedas2.push({...element,
          valorActual:Number((this.saldoIndividual).toFixed(2)),
          diferencia: Number((this.saldoIndividual - element.valorEnPesos ).toFixed(2))});
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

  public openPDFGrafico(): void {
    let DATA: any = document.getElementById('tabla');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
        
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('tabla-saldos.pdf');
    });
  }

}
