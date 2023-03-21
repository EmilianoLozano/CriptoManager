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
  indice:number=1;
  finalizo:Boolean=false;
  maxArray:number;
  totalArray:number;

  constructor(private criptoService:CriptomonedasService,
              private router : Router,
              private api_criptos:ApiCriptomonedasService) {
    this.cotDolar= Number(localStorage.getItem('dolar'));
 
    // YA FUNCIONA A MEJORAR
    // this.loading=true;
    // this.criptos=[];
    // this.criptoService.getCriptosOperables().subscribe((data:any)=>{
    //   this.criptos = data;
      
    //    setTimeout(() => {
    //      this.loading=false;  
    //    }, 2000);
    // });

     this.loading=true;
     this.criptos=[];

    this.criptoService.getCriptosOperablesGet().toPromise().then((data:any)=>{
      this.totalArray = data.docs.length;
      
      data.docs.forEach((element:any) => {
        if(element.data().simbolo !="USDT")
        {
          this.api_criptos.getPrecios(element.data().simbolo).subscribe((data:any)=>{
            const variacion = ((data.ask - data.open)/data.open)*100;
              this.criptos.push({...element.data(),
                variacion : variacion});
                if(this.indice == this.totalArray)
                {
                  this.loading=false;
                }
                else
                {
                  this.indice++;
                }
          });
        }
        else
        {
          this.criptos.push({...element.data(),
            variacion : 0 });
            if(this.indice == this.totalArray)
                {
                  this.loading=false;
                }
                else
                {
                  this.indice++;
                }
        }
        
      });

    
    })
    
   }

  ngOnInit(): void {
  
  }

  comprarCripto(simbolo:string)
  {
    
    this.router.navigateByUrl("/dashboard/billetera/comprar/"+simbolo+"");
    
  }

}
