
import { UpperCasePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { Criptomoneda } from 'src/app/Models/Criptomoneda';
import { ApiCriptomonedasService } from 'src/app/services/api-criptomonedas.service';
import { CriptomonedasService } from 'src/app/services/criptomonedas.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-cripto',
  templateUrl: './cripto.component.html'
})
export class CriptoComponent implements OnInit {
  
  mostrarValores:boolean=false;
  simbolo:string="";
  urlImage:string;
  nombreCripto:string;
  cotizacionDolar : number = 0;
  popUpPrecios:boolean=false;
  precioCompra:number;
  precioVenta:Number;

  constructor(private api_criptomonedas:ApiCriptomonedasService,
              private criptoService:CriptomonedasService,
              private messagesService:MessagesService) { }

  ngOnInit(): void {
    this.api_criptomonedas.getCotizacionDolar().subscribe((data:any)=>{
      this.cotizacionDolar=data.ask;
    });
  }

  buscarCripto(){
    if(this.simbolo==""){
      this.messagesService.mensajeError('block2','error','Simbolo vacío','Complete con un símbolo de criptomoneda existente en el mercado.');
    
      return;
    }
  
      this.api_criptomonedas.getCripto(this.simbolo).subscribe((data:any)=>{
        this.nombreCripto=data.full_name;
        this.urlImage= "https://images.weserv.nl/?url=farm.army/token/"+this.simbolo+".webp"
        this.mostrarValores=true;
      },(error:any)=>{
        console.log(error);
        this.messagesService.mensajeError('block2','error','Simbolo no existente','Complete con un símbolo de criptomoneda existente en el mercado.');
        return;
      })
     
     
  }

  agregarCripto(){
    if(this.nombreCripto ==""){
      this.messagesService.mensajeError('block2','error','Error en Registro','El campo Nombre de criptomoneda no puede ser vacío.');
      return;
    }
    const criptomoneda:Criptomoneda = {
      imagen:this.urlImage,
      simbolo:this.simbolo.toUpperCase(),
      nombre:this.nombreCripto
    };
     this.criptoService.addCripto(criptomoneda).then(()=>{
      this.messagesService.mensajeExito('Criptomoneda agregada','Se agregó la criptomoneda correctamente');
     });
  }

  consultarPrecio(){
    const valor= this.api_criptomonedas.getPrecios(this.simbolo).subscribe((data:any)=>{
      this.popUpPrecios =true;
      this.precioCompra = Math.round(data.ask * this.cotizacionDolar * 100)/100;
      this.precioVenta = Math.round(data.bid * this.cotizacionDolar * 100)/ 100;
    })
  }

}
