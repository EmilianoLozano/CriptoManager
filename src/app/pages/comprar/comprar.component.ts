import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { delay, delayWhen } from 'rxjs';
import { Criptomoneda } from 'src/app/Models/Criptomoneda';
import { Usuario } from 'src/app/Models/Usuario';
import { ApiCriptomonedasService } from 'src/app/services/api-criptomonedas.service';
import { AuthService } from 'src/app/services/auth.service';
import { CriptomonedasService } from 'src/app/services/criptomonedas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html'
})
export class ComprarComponent implements OnInit {

  loading:boolean  = false; 
  criptos: any[] = [];
  cotDolar : number;
  variacion:number=-5;
  indice:number=1;
  finalizo:Boolean=false;
  maxArray:number;

  constructor(private criptoService:CriptomonedasService,
              private router : Router,
              private api_criptos:ApiCriptomonedasService) {
    this.cotDolar= Number(localStorage.getItem('dolar'));
   }

  ngOnInit(): void {

    this.loading=true;
    this.criptoService.getCriptosOperables().subscribe((data:any)=>{   
      this.criptos = data;
      setTimeout(()=>{
        this.loading=false;
      },2700);
    });
  }

  comprarCripto(simbolo:string)
  {
    
    this.router.navigateByUrl("/dashboard/billetera/comprar/"+simbolo+"");
    
  }

}
