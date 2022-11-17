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
  loading:boolean=false;
  loadingBaja:boolean=false;
  loadingEditar:boolean=false;
  isOperable:boolean;
  indice:number=1;
  load:boolean = false;

  constructor(private criptomonedaService: CriptomonedasService,
              private api_criptomonedaService : ApiCriptomonedasService,
              private messagesService:MessagesService) { 
    this.load=true;
    this.criptomonedaService.getCriptos().subscribe((data:any)=>{
      this.criptos=[];
      data.forEach((element:any) => {
        this.criptos.push({...element.payload.doc.data()});
        if(this.indice == data.length)
        {
          this.load=false;
        }
        else
        {
          this.indice++;
        }
      }); 
     
    });
  }

  ngOnInit(): void {
    this.api_criptomonedaService.getCotizacionDolar().subscribe((data:any)=>{
      this.cotizacionDolar=data.ask;
    })
  }

  verPrecios(cripto : Criptomoneda){
    this.loading = true;
    if(cripto.simbolo == 'USDT' || cripto.simbolo == 'DAI' || cripto.simbolo == 'USDC')
    {
      this.popUpPrecios =true;
      this.nombreCripto=cripto.nombre;
      this.precioCompra = this.cotizacionDolar;
      this.precioVenta = this.cotizacionDolar - 1;
      this.loading = false;
    }
    else{
      const valor= this.api_criptomonedaService.getPrecios(cripto.simbolo).subscribe((data:any)=>{
        this.popUpPrecios =true;
        this.nombreCripto=cripto.nombre;
        this.precioCompra = data.ask * this.cotizacionDolar;
        this.precioVenta = data.bid * this.cotizacionDolar;
        this.loading = false;
      });
    }
  }

  abrirPopEditar(cripto:Criptomoneda)
  {
    console.log(cripto);
        this.popUpEditar=true;
        this.simbolo= cripto.simbolo;
        this.nombreCripto=cripto.nombre;
        this.isOperable= cripto.isOperable=='SÍ'? this.isOperable=true : this.isOperable=false;
        this.criptoSeleccionada=cripto;
  }
  abrirPopEliminar(cripto:Criptomoneda){
    this.popUpEliminar=true;
    this.nombreCripto=cripto.nombre;
    this.criptoSeleccionada=cripto;
    this.textoBaja='Esta seguro que desea dar de baja la operación de '+this.nombreCripto+' dentro de CriptoManager?.';
  }

  EditarCripto(){

    if(this.nombreCripto ==""){
      this.messagesService.mensajeError("block2","warn",'Error en Actualización','El campo Nombre de criptomoneda no puede ser vacío.');
      return;
    }

    const criptomoneda:Criptomoneda={
      nombre : this.nombreCripto,
      simbolo:this.simbolo,
      isOperable: this.isOperable?'SÍ':'NO'
    };
    this.loadingEditar = true;
      this.criptomonedaService.updateCripto(this.simbolo,criptomoneda).then(()=>{
        this.popUpEditar=false;
        this.loadingEditar = false;
        this.messagesService.mensajeExito('Criptomoneda actualizada','Se actualizó correctamente la criptomoneda '+this.criptoSeleccionada.simbolo+'');  
      });
  }

  EliminarCripto(){
    this.loadingBaja = true;
    const criptomoneda:Criptomoneda={
      nombre : this.criptoSeleccionada.nombre,
      simbolo:this.criptoSeleccionada.simbolo,
      isOperable:'NO'
    };
    this.criptomonedaService.updateCripto(this.criptoSeleccionada.simbolo,criptomoneda).then(()=>{
      this.popUpEliminar=false;
      this.loadingBaja = false;
      this.messagesService.mensajeExito('Baja de operación','Se dio de baja la operación de '+this.criptoSeleccionada.nombre+' correctamente.');
    })
  }


}
