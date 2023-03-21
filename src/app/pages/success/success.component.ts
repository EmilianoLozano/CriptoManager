import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiCriptomonedasService } from 'src/app/services/api-criptomonedas.service';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  status:string;
  saldoActual:number;
  loading:boolean = false;
  usuarioAutenticado:any;
  movimiento : any[] = [];
  subs$:Subscription;
  coin:string;
    constructor(private rutaActiva: ActivatedRoute,
            private usuarioService:UsuariosService,
            private transaccion:TransaccionesService,
            private api : ApiCriptomonedasService) { 
              this.usuarioAutenticado=localStorage.getItem('email');

              this.saldoActual = Number(localStorage.getItem('saldo'));
              

  }

  ngOnInit(): void { 
    this.loading=true;
    this.subs$= this.transaccion.getMovimientoPesos(this.usuarioAutenticado).subscribe((data:any)=>{
      this.movimiento = data.movimientos;

      this.actualizarSaldo();

  });

  
   
  }

  actualizarSaldo(){
    
    if(localStorage.getItem('ingreso')!=null || localStorage.getItem('ingreso')!=undefined)
    {
      const ingreso = Number(localStorage.getItem('ingreso'));
      const saldoActual = {saldo: this.saldoActual + ingreso};
      this.usuarioService.updateSaldo(this.usuarioAutenticado,saldoActual).then(()=>
      {
        
        const ingresoNuevo = {
          cantidad : ingreso,
          fecha: new Date(Date.now()),
          tipo : "INGRESO"
        };

      const ingresoNuevoHistorico = {
        movimientos : [...this.movimiento,ingresoNuevo]
      };
       
      this.transaccion.movimientoPesos(ingresoNuevoHistorico,this.usuarioAutenticado);
        this.saldoActual= this.saldoActual + ingreso;
        localStorage.removeItem('ingreso');
        localStorage.removeItem('saldo');
        this.loading=false;
      });

      this.subs$.unsubscribe();
    }
    else{
      this.usuarioService.get(this.usuarioAutenticado).subscribe((data:any)=>{
        this.saldoActual=data.saldo;
        this.loading=false;
        this.subs$.unsubscribe();
      })
   
    }
  }

}
