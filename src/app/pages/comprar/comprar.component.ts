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
  constructor(private criptoService:CriptomonedasService,
              private router : Router) {
    this.cotDolar= Number(localStorage.getItem('dolar'));
   }

  ngOnInit(): void {

    this.loading=true;
    this.criptoService.gets().subscribe((data:any)=>{
      this.criptos = data;
      this.loading=false;
    });
  }

  comprarCripto(simbolo:string)
  {
    
    this.router.navigateByUrl("/dashboard/billetera/comprar/"+simbolo+"");
    
  }

}
