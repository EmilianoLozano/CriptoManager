import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: any;
  chart: any;
  responsive: any;
  labels: any;
  colors:any;
};

@Component({
  selector: 'app-balance-cuenta',
  templateUrl: './balance-cuenta.component.html'
})
export class BalanceCuentaComponent implements OnInit {

  loading : boolean=false;
  movimientosPesos:any[]=[];
  usuarioAutenticado:any;
  movimientos:any[]=[];
  indice:number=1;
  fecha:string;
  saldoEnCuenta:number;
  totalIngresado:number=0;
  totalRetirado:number=0;
  @ViewChild("chart") chart: ChartComponent;
  isGrafico:boolean=true;
  public chartOptions: Partial<ChartOptions>;
  
  constructor(private transacciones:TransaccionesService,
              private usuarioService:UsuariosService) { 

    this.usuarioAutenticado= localStorage.getItem('email');

    this.usuarioService.get(this.usuarioAutenticado).subscribe((data:any)=>{
      this.saldoEnCuenta= data.saldo;
    });

    this.loading=true;
    this.transacciones.getMovimientoPesos(this.usuarioAutenticado).subscribe((data:any)=>{
      if(data == undefined)
      {
        this.loading=false;
        return ; 
      }
      if(data.movimientos.length== 0)
      {
        this.loading=false;
        return;
      }
      data.movimientos.sort((a:any,b:any)=> {
        if (a.fecha.seconds*1000 > b.fecha.seconds*1000)
          return -1;
        else if (a.fecha.seconds*1000 < b.fecha.seconds*1000)
            return 1;
        else
            return 0;
    });
    data.movimientos.forEach((element:any) => {
      this.fecha = new Date(element.fecha.seconds*1000).toLocaleDateString();
      if(element.tipo=="INGRESO")
      {
        this.totalIngresado += element.cantidad;
      }
      if(element.tipo=="RETIRO")
      {
        this.totalRetirado += element.cantidad;
      }
      this.movimientosPesos.push({
        tipo:element.tipo,
        cantidad : element.cantidad,
        fecha : this.fecha
      }); 
      if(this.indice == data.movimientos.length)
      {
        this.loading=false;
      }
      else
      {
        this.indice++;
      }
    });
    this.cargarGrafico();
    });
  }

  ngOnInit(): void {

   

  }

  cargarGrafico()
  {
    this.chartOptions = {
      series: [this.totalIngresado, this.totalRetirado, this.saldoEnCuenta],
      chart: {
        type: "donut",
        
      },
      labels: ["Ingresado", "Retirado", "En cuenta"],
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
      ]
      
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
