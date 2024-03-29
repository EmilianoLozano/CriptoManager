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
import { UsuariosService } from 'src/app/services/usuarios.service';
import { WalletService } from 'src/app/services/wallet.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ThisReceiver } from '@angular/compiler';
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
  selector: 'app-populares-xusuario',
  templateUrl: './populares-xusuario.component.html'
})
export class PopularesXusuarioComponent implements OnInit {

  
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  
  loading:boolean=false;
  simbolos : any[]=[];
  criptos:any[]=[];
  arrayNombre:any[]=[];
  arrayCantidades:any[]=[];
  isGrafico:boolean=true;
  usuario:string;
  usuarios:any[]=[];
  indice:number=1;
  walletId:string;
  isConsulta:boolean=false;
  rol:any;

  constructor(private transacciones:TransaccionesService,
              private criptomonedas : CriptomonedasService,
              private usuariosService : UsuariosService,
              private walletService:WalletService,
              private messageService:MessagesService) 
  { 
    
    this.loading=true;
    this.usuariosService.getUsuarios().subscribe(data=>{
      console.log(data);
      data.forEach((element:any) => {
        
        if(this.indice == 1)
        {
          this.usuarios.push({email:"Seleccione un usuario"});
          this.indice++;
        }
        if(element.payload.doc.data()['role'] != "ADMIN_ROLE")
        {
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
      tooltip: {
        enabled: false,
      },
      yaxis: {
        title: {
          text: "(Cantidad de Operaciones)",
          style: {
            color: 'gray',
            fontSize: '20px',
            
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 100,
            cssClass: 'apexcharts-yaxis-label',
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

  verOperaciones()
  {
    this.isConsulta = false;
    if(this.usuario != "Seleccione un usuario")
    {
          this.loading=true;
          this.criptos=[];
          this.arrayNombre=[];
          this.arrayCantidades=[];
          this.simbolos=[];


          this.transacciones.getMovimientosPopulares(this.usuario).subscribe(data=>{

            
              data.forEach((element:any) => {
                  console.log(element.data().detalles[0].cripto)
                  this.simbolos.push(element.data().detalles[0].cripto);
                  //this.simbolos.push(element.detalles[0].cripto);
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
              });
  
              this.cargarGrafico();
  
              this.loading=false;
              this.isConsulta = true;    
               
            })

        }
    else
    {
      this.messageService.mensajeError("block1","warn","Seleccione un usuario","Debe seleccionar un usuario a consultar");
    }
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
      
  //     PDF.save('Populares de '+this.usuario+'.pdf');
  //   });
  // }

  openPDFGrafico() {

    let DATA: any = document.getElementById('grafico');
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    const titleXPos = (doc.internal.pageSize.getWidth() / 2) - (doc.getTextWidth('Populares de '+this.usuario+'') / 2);
    doc.text('Populares de '+this.usuario+'', titleXPos, 20);
  
      html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
  
      let position = 0;
      doc.addImage(FILEURI, 'PNG', 0, 30 , fileWidth, fileHeight);
  
      
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');

    const date = new Date();
    const fecha = date.getDate() + "/"+(date.getMonth()+1) + "/"+ date.getFullYear();
    const foot = (doc.internal.pageSize.getWidth() / 2) - (doc.getTextWidth("Fecha de impresión: "+ fecha) / 2);
    doc.text("Fecha de impresión: "+fecha, foot, 290);

    doc.save('Populares de '+this.usuario+'.pdf');
    });
  }
  
  


}
