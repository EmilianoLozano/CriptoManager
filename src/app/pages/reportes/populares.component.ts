import { Component, OnInit, ViewChild } from '@angular/core';
import { CriptomonedasService } from 'src/app/services/criptomonedas.service';
import { TransaccionesService } from 'src/app/services/transacciones.service';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



export type ChartOptions = {
  series: any;
  chart: any;
  dataLabels: any;
  plotOptions: any;
  yaxis: any;
  xaxis: any;
  fill: any;
  tooltip: any;
  stroke: any;
  legend: any;
};

@Component({
  selector: 'app-populares',
  templateUrl: './populares.component.html'
})
export class PopularesComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  
  loading:boolean=false;
  simbolos : any[]=[];
  criptos:any[]=[];
  arrayNombre:any[]=[];
  arrayCantidades:any[]=[];
  isGrafico:boolean=true;
  indice:number=1;

  constructor(private transacciones:TransaccionesService,
              private criptomonedas : CriptomonedasService) { 
    this.loading=true;
    // this.transacciones.getTransaccionesPopulares().subscribe(data=>{
    
    //   data.forEach((element:any) => {
    //       this.simbolos.push(element.detalles[0].cripto);
    //   });
    //   let simb = this.simbolos.reduce((counter, value) => 
    //   {if(!counter[value]) 
    //     counter[value] = 1;
    //   else 
    //     counter[value]++; 

    //   return counter}, []);

    //   let arrayObject:any[]=[];

    //   Object.entries(simb).forEach(counter => 
    //   {
    //     arrayObject.push({
    //       cripto: counter[0],
    //       cantidad : counter[1],
    //       imagen : "https://images.weserv.nl/?url=farm.army/token/"+counter[0].toLowerCase()+".webp"
    //     });
    //   });
      
    //   this.criptos = arrayObject.sort(function(a:any, b:any){return b.cantidad - a.cantidad});
      
    //   this.criptos.forEach((element:any) => {
        
    //       this.arrayNombre.push(element.cripto);
    //       this.arrayCantidades.push(element.cantidad);
    //       if(this.indice == this.criptos.length)
    //       {
       
    //         this.cargarGrafico();
    //         this.loading=false;
           
    //       }
    //       else{
    //           this.indice++;
    //       }
    //     });
    // });

      this.transacciones.getTransaccionesPopulares().then((data:any)=>{
    
        data.forEach((element:any) => {
                this.simbolos.push(element.data().detalles[0].cripto);
            });
            let simb = this.simbolos.reduce((counter, value) => 
            {if(!counter[value]) 
              counter[value] = 1;
            else 
              counter[value]++; 
      
            return counter}, []);
      
            let arrayObject:any[]=[];
      
            Object.entries(simb).forEach(counter => 
            {
              arrayObject.push({
                cripto: counter[0],
                cantidad : counter[1],
                imagen : "https://images.weserv.nl/?url=farm.army/token/"+counter[0].toLowerCase()+".webp"
              });
            });
            
            this.criptos = arrayObject.sort(function(a:any, b:any){return b.cantidad - a.cantidad});
            
            this.criptos.forEach((element:any) => {
              
                this.arrayNombre.push(element.cripto);
                this.arrayCantidades.push(element.cantidad);
                if(this.indice == this.criptos.length)
                {
             
                  this.cargarGrafico();
                  this.loading=false;
                 
                }
                else{
                    this.indice++;
                }
              });

    });
  }

  ngOnInit(): void {
  }


cargarGrafico(){
  this.chartOptions = {
    series: [
      {
        name: "Cantidad",
        data: this.arrayCantidades
      },
    ],
    chart: {
      type: "bar",
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
      }
    },
    tooltip: {
      enabled: false,
    },
    dataLabels: {
      enabled: true
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"]
    },
    xaxis: {
      categories: this.arrayNombre,
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
      title: {
        text: "(Cantidad de Operaciones)",
        style: {
          color: 'gray',
          fontSize: '20px',
          
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 400,
      }
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
    fill: {
      opacity: 1
    },

  };
}

verDetalle(){
  this.isGrafico=false;
}
verGrafico(){
  this.isGrafico=true;
}

// public openPDFGrafico(): void {
//   let DATA: any = document.getElementById('grafico');
//   html2canvas(DATA).then((canvas) => {
//     let fileWidth = 208;
//     let fileHeight = (canvas.height * fileWidth) / canvas.width;
//     const FILEURI = canvas.toDataURL('image/png');
//     let PDF = new jsPDF('p', 'mm', 'a4');
//     let position = 0;
//     PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
//     PDF.save('populares.pdf');
//   });
// }


openPDFGrafico() {

  let DATA: any = document.getElementById('grafico');
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  const titleXPos = (doc.internal.pageSize.getWidth() / 2) - (doc.getTextWidth("Populares en CriptoManager") / 2);
  doc.text("Populares en CriptoManager", titleXPos, 20);

    html2canvas(DATA).then((canvas) => {
    let fileWidth = 208;
    let fileHeight = (canvas.height * fileWidth) / canvas.width;
    const FILEURI = canvas.toDataURL('image/png');

    let position = 0;
    doc.addImage(FILEURI, 'PNG', 0, 30 , fileWidth, fileHeight);

  doc.save('populares.pdf');
  });
}


}
