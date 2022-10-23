import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private rutaActiva: ActivatedRoute,
            private usuarioService:UsuariosService) { 
              this.saldoActual = Number(localStorage.getItem('saldo'));
              
  }

  ngOnInit(): void { 
    this.actualizarSaldo();
  }

  actualizarSaldo(){
    this.loading=true;
    if(localStorage.getItem('ingreso')!=null || localStorage.getItem('ingreso')!=undefined)
    {
      const ingreso = Number(localStorage.getItem('ingreso'));
      const saldoActual = {saldo: this.saldoActual + ingreso};
      this.usuarioService.updateSaldo("emilozano425@gmail.com",saldoActual).then(()=>
      {
        this.saldoActual= this.saldoActual + ingreso;
        localStorage.removeItem('ingreso');
        localStorage.removeItem('saldo');
        this.loading=false;
      });
    }
    else{
      this.usuarioService.get("emilozano425@gmail.com").subscribe((data:any)=>{
        this.saldoActual=data.saldo;
        this.loading=false;
      })
   
    }
  }

}
