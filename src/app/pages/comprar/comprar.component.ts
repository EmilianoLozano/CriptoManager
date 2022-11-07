import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { delay, delayWhen, Subscription } from 'rxjs';
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
  criptos:any[]  =  [];
  cotDolar : number;
  variacion:number;
  indice:number=0;
  finalizo:Boolean=false;
  maxArray:number;
  
  constructor(private criptoService:CriptomonedasService,
              private router : Router,
              private api_criptos:ApiCriptomonedasService) {
    this.cotDolar= Number(localStorage.getItem('dolar'));

    this.loading=true;
     this.criptos=[];
    const resp:any = this.criptoService.getCriptosOperables().subscribe((data:any)=>{
      this.criptos = data;
      // console.log(this.criptos);
       setTimeout(() => {
         this.loading=false;  
       }, 2800);
    });

   }

  ngOnInit(): void {

  
    // this.criptoService.getOperables().subscribe((data:any)=>{  
    //   this.criptos=[];
    //   data.forEach((element:any) => {
    //     if(element.simbolo != "USDT"){
    //       this.api_criptos.getPrecios(element.simbolo).subscribe((data:any)=>{
    //         const variacion = ((data.ask - data.open)/data.open)*100;
    //         this.criptos.push({...element,
    //           variacion : variacion});
    //       });
    //     }
    //     else{
    //         this.criptos.push({...element,
    //           variacion : 0 });
    //     }
    //     this.indice++;
    //     if(this.indice == data.length)
    //     {
    //       setTimeout(()=>{
    //       this.loading=false;
    //       },2800);
    //     }
    //   });
      
   

    //   // this.criptos = data;
    
    // });
  }

  comprarCripto(simbolo:string)
  {
    
    this.router.navigateByUrl("/dashboard/billetera/comprar/"+simbolo+"");
    
  }

}
