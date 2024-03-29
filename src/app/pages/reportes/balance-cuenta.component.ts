import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ChartComponent } from "ng-apexcharts";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { MessagesService } from 'src/app/services/messages.service';

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
  selector: 'app-balance-cuenta',
  templateUrl: './balance-cuenta.component.html'
})
export class BalanceCuentaComponent implements OnInit {


  @ViewChild('content', { static: false }) el!: ElementRef;
  
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
  mes:Date;
  cols: any[];

  exportColumns: any[];

  constructor(private transacciones:TransaccionesService,
              private usuarioService:UsuariosService,
              private messageService:MessagesService) { 

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

    this.cols = [
      { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' }
  ];

  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));

  }

  cargarGrafico()
  {
    this.chartOptions = {
      series: [Number(this.totalIngresado.toFixed(2)), Number(this.totalRetirado.toFixed(2)), Number(this.saldoEnCuenta.toFixed(2))],
      chart: {
        type: "donut",
      
      },
      legend: {
        show: true,
        labels: {
          colors: 'gray',
        }
      },
      labels: ["Ingresado ($)", "Retirado ($)", "En cuenta ($)"],
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

  buscar(){
    if(this.mes ==undefined)
    {
      this.messageService.mensajeError("block1","warn","Error de búsqueda","Indique el mes que desea consultar");
      return;
    }

    this.movimientosPesos=[];
    this.totalIngresado = 0;
    this.totalRetirado = 0;
    
    this.loading=true;
    this.transacciones.getMovimientoPesosPorFecha(this.usuarioAutenticado).subscribe((data:any)=>{
      

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

      if(data.movimientos.length >0 )
      {
        const desde = this.mes;
        const hasta = this.addMonths(1, this.mes);

        
        data.movimientos.forEach((element:any) => {

          if(new Date(element.fecha.seconds*1000)> desde && new Date(element.fecha.seconds*1000) < hasta)
          {
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
          }
          else
          {
            if(this.indice == data.movimientos.length)
            {
              this.loading=false;
            }
            else
            {
              this.indice++;
            }
          }
        });
          this.cargarGrafico();
      }
    });
  }

  addMonths(numOfMonths:number, date = new Date()) {
    const dateCopy = new Date(date.getTime());
  
    dateCopy.setMonth(dateCopy.getMonth() + numOfMonths);
  
    return dateCopy;
  }
  // public openPDFGrafico(): void {
  //   let DATA: any = document.getElementById('grafico');
  //   html2canvas(DATA).then((canvas) => {
  //     let fileWidth = 208;
  //     let fileHeight = (canvas.height * fileWidth) / canvas.width;
  //     const FILEURI = canvas.toDataURL('image/png');
  //     let PDF = new jsPDF('p', 'mm', 'a4');
  //     if(this.mes)
  //       {
  //         const mes = (this.mes.getMonth()+1);
  //         const anio = this.mes.getFullYear();
  //         const fecha = mes + "/" + anio;
  //         PDF.text("Balance de cuenta "+fecha+"",65,10);
  //       }
  //     else
  //       PDF.text("Balance de cuenta Total",65,10);
  //     let position = 0;
  //     PDF.addImage(FILEURI, 'PNG', 10, 20, fileWidth, fileHeight);
      
  //     PDF.save('balance.pdf');
  //   });
  // }


  openPDFGrafico() {
    
    let DATA: any = document.getElementById('grafico');
    const doc = new jsPDF();

    if(this.mes)
    {
      const mes = (this.mes.getMonth()+1);
      const anio = this.mes.getFullYear();
      const fecha = mes + "/" + anio;
      doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    const titleXPos = (doc.internal.pageSize.getWidth() / 2) - (doc.getTextWidth("Balance de cuenta "+fecha+"") / 2);
    doc.text("Balance de cuenta "+fecha+"", titleXPos, 20);
      // doc.text("Balance de cuenta "+fecha+"",65,10);
    }
    else
    {
      doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    const titleXPos = (doc.internal.pageSize.getWidth() / 2) - (doc.getTextWidth("Balance de cuenta total") / 2);
    doc.text("Balance de cuenta Total", titleXPos, 20);
      // doc.text("Balance de cuenta Total",65,10);
    }
      html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');

      let position = 0;

      if(this.isGrafico)
        doc.addImage(FILEURI, 'PNG', 17, 30 , fileWidth, fileHeight);
      else
        doc.addImage(FILEURI, 'PNG', 0, 30 , fileWidth, fileHeight);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');

    const date = new Date();
    const fecha = date.getDate() + "/"+(date.getMonth()+1) + "/"+ date.getFullYear();
    const foot = (doc.internal.pageSize.getWidth() / 2) - (doc.getTextWidth("Fecha de impresión: "+ fecha) / 2);
    doc.text("Fecha de impresión: "+fecha, foot, 290);

    doc.save('balance.pdf');
    });
  }


  makePdf() {
    let pdf = new jsPDF()
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("sample.pdf")
      }
    })
  }

}



