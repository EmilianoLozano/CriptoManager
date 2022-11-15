import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { WalletService } from 'src/app/services/wallet.service';
import { ChartComponent } from "ng-apexcharts";


import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { Subscription } from 'rxjs';

export type ChartOptions = {
  series: any;
  chart: any;
  responsive: any;
  labels: any;
  colors:any;
  plotOptions:any;
  legend:any;
};

@Component({
  selector: 'app-balance-admin',
  templateUrl: './balance-admin.component.html',
  
})
export class BalanceAdminComponent implements OnInit,OnDestroy {

  desde : Date;
  hasta:Date;
  transacciones:any[]=[];
  totalPesos:number=0;
  cripto :string;
  totalCripto:number=0;
  saldoPesos:number=0;
  usuario:string;
  usuarios:any[]=[];
  indice:number=1;
  loading:boolean=false;
  usuarioConsultado:string;
  isConsultado:boolean=false;
  totalIngreso:number=0;
  totalEgreso:number=0;
  @ViewChild("chart") chart: ChartComponent;
  isGrafico:boolean=true;
  public chartOptions: Partial<ChartOptions>;
  loadingData:boolean=false;
  maxDate:Date;
  subs$:Subscription;

  constructor(private transaccionesService : TransaccionesService,
                    private usuariosService : UsuariosService,
                    private messagesService:MessagesService) {
    this.maxDate=new Date(Date.now());
    this.loading=true;
    this.usuariosService.getUsuarios().subscribe(data=>{

      data.forEach((element:any) => {
        if(element.payload.doc.data()['role'] == "USER_ROLE")
        {
          if(this.indice == 1)
          {
            this.usuarios.push({email:"Todos los usuarios"});
            this.indice++;
          }
          this.usuarios.push(element.payload.doc.data());
          if(this.indice == data.length)
          {
            this.loading=false;
          }
          else
          {
            this.indice++;
          }
        }
        if(this.indice == data.length)
        {
          this.loading=false;
        }
        else
        {
          this.indice++;
        }
      });

    });

   }
  ngOnDestroy(): void {
    if(this.subs$)
      this.subs$.unsubscribe();
  }

  ngOnInit(): void {
  }

  calcular(){
    if(this.desde == undefined || this.hasta == undefined)
    {
      this.messagesService.mensajeError("block1","error","Error!","Debe indicar un rango de fechas a consultar");
      return;
    }
    this.transacciones=[];
    this.totalPesos=0;
    this.totalCripto=0;
    this.saldoPesos=0;
    this.usuarioConsultado=this.usuario;
    this.isConsultado=false;
    this.totalIngreso =0;
    this.totalEgreso=0;
    this.loadingData=true;
    this.indice=0;


    this.subs$=this.transaccionesService.getTransaccionesPorFecha_UsuarioGet(
      this.desde,this.hasta).subscribe((data:any)=>{
        console.log(data);
  
        if(data.docs.length > 0)
        {
          data.docs.forEach((element:any) => {
            console.log(element.data());
              this.indice++;
              if(this.usuario == "Todos los usuarios")
              {
                const fecha =  new Date(element.data().fecha.seconds*1000).toLocaleDateString();
            
                this.totalPesos +=   element.data().detalles[0].cantidadPesos;
                this.cripto= element.data().detalles[0].cripto;
                this.totalCripto=element.data().detalles[0].cantidadCripto;
                this.saldoPesos = element.data().detalles[0].cantidadPesos;
          
                if(element.data().operacion == "COMPRA")
                {
                  this.totalIngreso += element.data().detalles[0].cantidadPesos;
                }
  
                if(element.data().operacion == "VENTA")
                {
                  this.totalEgreso += element.data().detalles[0].cantidadPesos;
                }
  
                this.transacciones.push({
                  fecha : fecha,
                  operacion: element.data().operacion,
                  cripto : this.cripto,
                  cantCripto : this.totalCripto,
                  cantPesos: this.saldoPesos
                });  
              }
  
              if(element.data().emailUsuario == this.usuario)
              {
                const fecha =  new Date(element.data().fecha.seconds*1000).toLocaleDateString();
            
                this.totalPesos +=   element.data().detalles[0].cantidadPesos;
                this.cripto= element.data().detalles[0].cripto;
                this.totalCripto=element.data().detalles[0].cantidadCripto;
                this.saldoPesos = element.data().detalles[0].cantidadPesos;
    
                if(element.data().operacion == "COMPRA")
                {
                  this.totalIngreso += element.data().detalles[0].cantidadPesos;
                }
  
                if(element.data().operacion == "VENTA")
                {
                  this.totalEgreso += element.data().detalles[0].cantidadPesos;
                }
  
                this.transacciones.push({
                  fecha : fecha,
                  operacion: element.data().operacion,
                  cripto : this.cripto,
                  cantCripto : this.totalCripto,
                  cantPesos: this.saldoPesos
                });  
  
              }
  
              if(this.indice==data.docs.length)
                {
                  this.cargarGrafico();
                  this.loadingData=false;
                  this.isConsultado=true;
                }
            
          });
        }
        else
        {
          this.isConsultado=true;
          this.loadingData=false;
        }
      });
  }


  cargarGrafico()
  {
    this.chartOptions = {
      series: [Number(this.totalPesos.toFixed(2)), Number(this.totalEgreso.toFixed(2)), Number(this.totalIngreso.toFixed(2))],
      chart: {
        type: "pie",
      
      },
      legend: {
        show: true,
        labels: {
          colors: 'gray',
        }
      },
      labels: ["Dinero Operado en la plataforma ($)", "Dinero Extraído de la plataforma ($)", "Dinero en Billeteras CriptoManager ($)"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true
              },
              value: {
                show: true,
                color:'gray'
              }
            }
          }
        }
      }
    };
  }

  verGrafico()
  {
    this.isGrafico=true;
  }

  verDetalle(){
    this.isGrafico=false;
  }




}
