import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Criptomoneda } from 'src/app/Models/Criptomoneda';
import { Usuario } from 'src/app/Models/Usuario';
import { ApiCriptomonedasService } from 'src/app/services/api-criptomonedas.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-vender',
  templateUrl: './vender.component.html'
})
export class VenderComponent implements OnInit {

  usuario : any;
  monedas:any[]=[];
  indice:number=1;
  loading:boolean=false;

  constructor(private walletService:WalletService,
              private router:Router){

    this.usuario = localStorage.getItem('email');
    this.monedas=[];
    this.loading=true;
    this.walletService.getWallet(this.usuario).subscribe(data=>{

      if(data[0].monedas.length == 0)
      {
        this.loading=false;
        return;
      }

      this.monedas=data[0].monedas;
      this.loading=false;
    });
  }

  ngOnInit(): void {

  }

  venderCripto(simbolo:string)
  {
    
    this.router.navigateByUrl("/dashboard/billetera/vender/"+simbolo+"");
    
  }


}
