import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/Models/Usuario';
import { ApiCriptomonedasService } from 'src/app/services/api-criptomonedas.service';
import { AuthService } from 'src/app/services/auth.service';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit,OnDestroy {

  cotDolar:number;
  usuarioAutenticado:any;
  saldo:number;
  movimientos: any[] = [];
  fecha:string;
  loading:boolean=false;
  nombre:string;
  apellido:string;
  indice:number=1;
  subs$:Subscription;

  constructor(private api_criptos : ApiCriptomonedasService,
              private walletService:WalletService,
              private transaccionesService:TransaccionesService,
              private usuarioService:UsuariosService)              
  { 

    if(localStorage.getItem('dolar')==null){
    this.api_criptos.getCotizacionDolar().subscribe((data:any)=>{
      localStorage.setItem('dolar',data.ask);
      this.cotDolar= data.ask;
       });
    }
  }
  ngOnDestroy(): void {
    if(this.subs$)
      this.subs$.unsubscribe();
  }

  ngOnInit(): void {
    this.loading=true;
    this.movimientos=[];
    this.usuarioAutenticado = localStorage.getItem('email');

    this.subs$=this.usuarioService.get(this.usuarioAutenticado).subscribe((data:any)=>{
      this.nombre=data.nombre;
      this.saldo=data.saldo;
      this.apellido = data.apellido;

      this.transaccionesService.getMovimientos10(this.usuarioAutenticado).subscribe(data=>{
        if(data.length== 0)
        {
          this.loading=false;
          return;
        }
        data.sort((a:any,b:any)=> {
          if (a.fecha.seconds*1000 > b.fecha.seconds*1000)
            return -1;
          else if (a.fecha.seconds*1000 < b.fecha.seconds*1000)
              return 1;
          else
              return 0;
      });
        data.forEach((element:any) => {
          this.fecha = new Date(element.fecha.seconds*1000).toLocaleDateString();
          this.movimientos.push({
            operacion:element.operacion,
            cripto : element.detalles[0].cripto,
            cantidad : element.detalles[0].cantidadCripto,
            precio : element.detalles[0].precio,
            fecha : this.fecha
          }); 
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
    });



   
   


  }



}
