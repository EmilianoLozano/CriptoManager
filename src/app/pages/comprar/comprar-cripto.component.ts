import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { Criptomoneda } from 'src/app/Models/Criptomoneda';

import { Transaccion } from 'src/app/Models/Transaccion';
import { ApiCriptomonedasService } from 'src/app/services/api-criptomonedas.service';
import { CompraService } from 'src/app/services/compra.service';
import { CriptomonedasService } from 'src/app/services/criptomonedas.service';
import { MessagesService } from 'src/app/services/messages.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { WalletService } from 'src/app/services/wallet.service';

export type ChartOptions = {
  series: any;
  chart: any;
  xaxis: any;
  yaxis: any;
  title: any;
};


@Component({
  selector: 'app-comprar-cripto',
  templateUrl: './comprar-cripto.component.html'
})
export class ComprarCriptoComponent implements OnInit {

  simbolo:string ;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  cotDolar:number;
  seriesVacio:boolean=false;
  public arrayDatas : any =[];
  cantidadCompra:number;
  saldoActual:number;
  totalCompra:number;
  loadTotal:boolean;
  precioActual:number;
  billetera_id:string ;
  loading:boolean=false;
  monedas : any =[];
  cantCriptoWallet:number = 0; 
  criptomoneda:Criptomoneda;

  constructor(private activatedRoute : ActivatedRoute,
              private api_criptos:ApiCriptomonedasService,
              private usuarioService:UsuariosService,
              private compraService:CompraService,
              private walletService  :WalletService,
              private messageService:MessagesService,
              private router:Router,
              private criptomonedasService:CriptomonedasService) { 
    this.simbolo = activatedRoute.snapshot.params['simbolo'];
    this.cotDolar=Number(localStorage.getItem('dolar'));
    
    this.criptomonedasService.get(this.simbolo).subscribe((data:any)=>{
      this.criptomoneda=data;
    });

    this.usuarioService.getUsuario("emilozano425@gmail.com").subscribe(data=>{
      this.saldoActual = data.payload.data()['saldo'];
    });
   
    if(this.simbolo != "USDT" && this.simbolo != "DAI")
    {
    this.api_criptos.getPrecios(this.simbolo).subscribe((data:any)=>{
      this.precioActual = data.ask * this.cotDolar;
    });
    }
    else
    {
      this.precioActual=this.cotDolar;
      this.seriesVacio=true;
    }

    this.walletService.getWalletId("emilozano425@gmail.com").subscribe(data=>{
      this.billetera_id= data.docs[0].id;
    });



  }

  ngOnInit(): void {
    if(this.simbolo != "USDT" && this.simbolo != "DAI")
      this.iniciarGrafico(this.simbolo);

      this.walletService.getWallet("emilozano425@gmail.com").subscribe((data:any)=>{
        this.monedas=data[0].monedas;
        console.log(this.monedas);       
          this.monedas.forEach((element:any) => {
            if(this.simbolo == element.cripto)
              this.cantCriptoWallet = element.cantidad;
        });
        console.log(this.cantCriptoWallet);
      })
  }


  public generateDayWiseTimeSeries(baseval:any, count:any, yrange:any) {
    var i = 0;
    var series = [];
    while (i < count) {
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([baseval, y]);
      baseval += 86400000;
      i++;
    }
    console.log(baseval + "-" + count + "-" + yrange );
    return series;
  } 
  cargarGrafico(){
    this.chartOptions = {
      series: [
        {
          // y = open, max, min, close
          name: "candle",
          data :  this.arrayDatas  
        },
      ],
      chart: {
        type: "candlestick",
        height: 300,
      },
   
      title: {
        text: "Variación de "+this.simbolo+" los últimos 90 días",
        align: "left",
        style: {
          color: 'gray',
          fontSize: '16px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 600,
          cssClass: 'apexcharts-yaxis-title',
      },
        
      },
      xaxis: {
        type: "datetime",
        
        labels: {
          show: true,
          align: 'right',
          minWidth: 0,
          maxWidth: 160,
          style: {
              colors: 'gray',
              fontSize: '12px',
              
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              cssClass: 'apexcharts-yaxis-label',
          }
      }
      },
      yaxis: {
        tooltip: {
          enabled: true
        },
        labels: {
          show: true,
          align: 'right',
          minWidth: 0,
          maxWidth: 160,
          style: {
              colors: 'gray',
              fontSize: '12px',
              
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              cssClass: 'apexcharts-yaxis-label',
          }
      }
      },
      
    };
  }
  iniciarGrafico(cripto : string){
    this.seriesVacio=false;
    this.arrayDatas=[];
    this.api_criptos.conectarApiCandles(cripto).subscribe((data:any)=>{  

      data.forEach((element : any) => {
        this.arrayDatas.push( {
          x:  new Date(element.timestamp),
          y: [Math.round(Number(element.open*this.cotDolar)),
              Math.round(Number(element.max*this.cotDolar)),
              Math.round(Number(element.min*this.cotDolar)),
              Math.round(Number(element.close*this.cotDolar))]
         
        })
      });
     this.cargarGrafico();
     this.seriesVacio=true;
    });
  }

  verificarMaximo(event:any){

    if(event >= this.saldoActual)
    {
      this.cantidadCompra=this.saldoActual;
    }
    else
      this.cantidadCompra=event;

    this.totalCompra = this.cantidadCompra / this.precioActual;

  }

  comprarCripto(){
    if(this.cantidadCompra>0){
      const transaccion : Transaccion= {
        fecha : new Date(Date.now()),
        operacion: "compra",
        billetera_id: this.billetera_id,
        detalles : [{
          cripto: this.simbolo,
          cantidadPesos : this.cantidadCompra,
          precio:this.precioActual,
          cantidadCripto:this.totalCompra
        }]
      }

      const actualizarSaldo = {
        saldo:this.saldoActual-this.cantidadCompra
      };
      this.loading=true;
      this.compraService.comprarCripto(transaccion).then(()=>{});

      if(this.cantCriptoWallet==0){
        const moneda={
          monedas:[...this.monedas,
          {
          cripto:this.simbolo,
          cantidad: this.cantCriptoWallet+this.totalCompra,
          nombre:this.criptomoneda.nombre,
          imagen:this.criptomoneda.imagen
          }]
        }
        this.walletService.updateCripto(this.billetera_id,moneda);
      }
      else
      {
        let i = 0;
        console.log(this.monedas);
        this.monedas.forEach((element:any) => {
            if(this.simbolo == element.cripto)
              {
                this.monedas.splice(i,1);
              }
              i++;
        });
        const moneda={
          monedas:[...this.monedas,
          {
          cripto:this.simbolo,
          cantidad: this.cantCriptoWallet+this.totalCompra,
          nombre:this.criptomoneda.nombre,
          imagen:this.criptomoneda.imagen
          }]
        };
        this.walletService.updateCripto(this.billetera_id,moneda);
        console.log(this.monedas);
      }
      
      this.usuarioService.updateSaldo("emilozano425@gmail.com",actualizarSaldo).then(()=>{
        this.messageService.mensajeError('block1','success','Transacción exitosa!','Se realizó la compra exitosamente. Ya dispones del saldo de '+this.simbolo+' en tu billetera');
        this.cantidadCompra=0;
        this.totalCompra=0;
        this.loading=false;
      });
    }
    else
    {
      this.messageService.mensajeError('block1','error','Error!','Indique una cantidad en pesos de compra');
    
    }
  }


  cancelarCompra(){
    this.router.navigateByUrl("/dashboard/billetera/comprar");
  }




}
