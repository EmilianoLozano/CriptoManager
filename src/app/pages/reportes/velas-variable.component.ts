import { Component, OnInit, ViewChild } from '@angular/core';
import {PrimeIcons} from 'primeng/api';
import { ApiCriptomonedasService } from 'src/app/services/api-criptomonedas.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { CriptomonedasService } from 'src/app/services/criptomonedas.service';
import { MessagesService } from 'src/app/services/messages.service';
import { idToken } from '@angular/fire/auth';
import { Router } from '@angular/router';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


export type ChartOptions = {
  series: any;
  chart: any;
  xaxis: any;
  yaxis: any;
  title: any;
  tooltip:any;
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
  criptos:any[]=[];
  cripto:string;
  loading:boolean=false;
  loadingGrafico:boolean=false;
  periodo:number;
  periodoDesc:string ="30 min";

  constructor( private api_criptos:ApiCriptomonedasService,
               private criptomonedas:CriptomonedasService,
               private messageservice: MessagesService,
               private router : Router) { 
    this.cotDolar=Number(localStorage.getItem('dolar'));

    this.loading=true;
    this.criptomonedas.getOperables().subscribe(data=>{
        
        this.criptos=data.filter((x:any)=>{
          return x.simbolo!="USDT"
        });
        this.criptos.unshift({
          nombre:'Seleccione una criptomoneda',
          simbolo : ''
        })
        console.log(this.criptos);  
        this.loading=false;
    })
  }

  ngOnInit(): void {

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
      tooltip: {
        enabled: false,
      },
      title: {
        text: "Variación de "+this.cripto+". Período: "+this.periodoDesc,
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
  iniciarGrafico(cripto : string , periodo : string){
    this.seriesVacio=false;
    this.arrayDatas=[];
    if(periodo == "")
      periodo="M30";

    this.api_criptos.conectarApiCandlesPorPeriodo(cripto,periodo).subscribe((data:any)=>{  

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
     if(this.loadingGrafico)
      this.loadingGrafico=false;
    });
  }


  verGrafico(){
    if(this.cripto!=""){
      this.loadingGrafico=true;
      this.iniciarGrafico(this.cripto,"");
    }
    else
    {
      this.messageservice.mensajeError("block1","warn","Seleccione una criptomoneda","Debe seleccionar una criptomoneda");
    }
  }

    
  handleChange(event:any) {

    this.periodo = event.index;
    if(this.cripto!=""){
      this.loadingGrafico=true;
      let periodo;

      switch ( event.index ) {
        case 0:
            periodo="M30";
            this.periodoDesc="30 min";
            break;
        case 1:
            periodo="H1";
            this.periodoDesc="1 hora";
            break;      
        case 2:
            periodo="H4";
            this.periodoDesc="4 horas";
            break; 
        case 3:
            periodo="D1";
            this.periodoDesc="1 día";
            break;    
        case 4:
            periodo="D7";
            this.periodoDesc="1 semana";
            break;   
        default: 
            periodo="M30";
            this.periodoDesc="30 min";
            break;
     }

      this.iniciarGrafico(this.cripto,periodo);
    }
  }


  public openPDFGrafico(): void {
    let DATA: any = document.getElementById('grafico');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('grafico-cripto.pdf');
    });
  }


}
