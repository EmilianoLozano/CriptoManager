import { Component, OnInit, ViewChild } from '@angular/core';

import { ApiCriptomonedasService } from 'src/app/services/api-criptomonedas.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";


export type ChartOptions = {
  series: any;
  chart: any;
  xaxis: any;
  yaxis: any;
  title: any;
};

@Component({
  selector: 'app-velas-variable',
  templateUrl: './velas-variable.component.html'
})
export class VelasVariableComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  seriesVacio:boolean=false;
  simbolo:string ;
  arrayDatas:any[]=[];
  cotDolar:number;
  
  constructor( private api_criptos:ApiCriptomonedasService) { 
    this.cotDolar=Number(localStorage.getItem('dolar'));
  }

  ngOnInit(): void {
    this.simbolo="ETH";
    this.iniciarGrafico(this.simbolo);
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

}
