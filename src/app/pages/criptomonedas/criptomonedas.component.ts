import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Criptomoneda } from 'src/app/Models/Criptomoneda';
import { ApiCriptomonedasService } from 'src/app/services/api-criptomonedas.service';
import { CriptomonedasService } from 'src/app/services/criptomonedas.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-criptomonedas',
  templateUrl: './criptomonedas.component.html',
  styleUrls: ['./criptomonedas.component.scss']
})
export class CriptomonedasComponent implements OnInit {

  criptos : Criptomoneda[] =[];
  cotizacionDolar : number = 0;
  precioCompra:number;
  precioVenta:number;
  popUpPrecios:boolean=false;
  nombreCripto:string;
  popUpEditar:boolean=false;
  popUpEliminar:boolean=false;
  textoBaja:string;
  criptoSeleccionada:Criptomoneda;
  simbolo:string;
  constructor(private criptomonedaService: CriptomonedasService,
              private api_criptomonedaService : ApiCriptomonedasService,
              private messagesService:MessagesService) { 
    
    this.criptomonedaService.getCriptos().subscribe(data=>{
      this.criptos=[];
      data.forEach((element:any) => {
        this.criptos.push({...element.payload.doc.data()});
      }); 
      console.log(this.criptos);
    });
  }

  ngOnInit(): void {
    this.api_criptomonedaService.getCotizacionDolar().subscribe((data:any)=>{
      this.cotizacionDolar=data.ask;
    })

  }

  verPrecios(cripto : Criptomoneda){
    if(cripto.simbolo == 'USDT' || cripto.simbolo == 'DAI' || cripto.simbolo == 'USDC')
    {
      this.popUpPrecios =true;
      this.nombreCripto=cripto.nombre;
      this.precioCompra = this.cotizacionDolar;
      this.precioVenta = this.cotizacionDolar - 1;
    }
    else{
      const valor= this.api_criptomonedaService.getPrecios(cripto.simbolo).subscribe((data:any)=>{
        this.popUpPrecios =true;
        this.nombreCripto=cripto.nombre;
        this.precioCompra = data.ask * this.cotizacionDolar;
        this.precioVenta = data.bid * this.cotizacionDolar;
      });
    }
  }

  abrirPopEditar(cripto:Criptomoneda)
  {
        this.popUpEditar=true;
        this.simbolo= cripto.simbolo;
        this.nombreCripto=cripto.nombre;
        this.criptoSeleccionada=cripto;
  }
  abrirPopEliminar(cripto:Criptomoneda){
    this.popUpEliminar=true;
    this.nombreCripto=cripto.nombre;
    this.criptoSeleccionada=cripto;
    this.textoBaja='Esta seguro que desea eliminar de CriptoManager la criptomoneda '+this.nombreCripto+' ?.';
  }

  EditarCripto(){

    if(this.nombreCripto ==""){
      this.messagesService.mensajeExito('Error en Actualización','El campo Nombre de criptomoneda no puede ser vacío.');
      return;
    }

    const criptomoneda:Criptomoneda={
      nombre : this.nombreCripto,
      simbolo:this.simbolo
    };
      this.criptomonedaService.updateCripto(this.simbolo,criptomoneda).then(()=>{
        this.popUpEditar=false;
        this.messagesService.mensajeExito('Criptomoneda actualizada','Se actualizó correctamente la criptomoneda '+this.criptoSeleccionada.nombre+'');  
      });
  }

  EliminarCripto(){
    this.criptomonedaService.deleteCripto(this.criptoSeleccionada.simbolo).then(()=>{
      this.popUpEliminar=false;
      this.messagesService.mensajeExito('Criptomoneda eliminada','Se eliminó correctamente la criptomoneda '+this.criptoSeleccionada.nombre+'');
    })
  }


}
