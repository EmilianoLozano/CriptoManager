
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
  simbolo:string;
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
    })
  }

  buscarCripto(){

    this.api_criptomonedas.getCripto(this.simbolo).subscribe((data:any)=>{
      console.log(data);
      this.nombreCripto=data.full_name;
      this.urlImage= "https://images.weserv.nl/?url=farm.army/token/"+this.simbolo+".webp"
      this.mostrarValores=true;
    })
  }

  agregarCripto(){
    const criptomoneda:Criptomoneda = {
      imagen:this.urlImage,
      simbolo:this.simbolo.toUpperCase(),
      nombre:this.nombreCripto
    };
     this.criptoService.addCripto(criptomoneda).then(()=>{
      this.messagesService.mensajeExito('block2','Criptomoneda agregada','Se agregó la criptomoneda correctamente');
     });
  }

  consultarPrecio(){
    const valor= this.api_criptomonedas.getPrecios(this.simbolo).subscribe((data:any)=>{
      this.popUpPrecios =true;
      this.precioCompra = data.ask * this.cotizacionDolar;
      this.precioVenta = data.bid * this.cotizacionDolar;
    })
  }

}
