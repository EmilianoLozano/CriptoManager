import { Component, OnInit } from '@angular/core';
import { Criptomoneda } from 'src/app/Models/Criptomoneda';
import { Usuario } from 'src/app/Models/Usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-vender',
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.scss']
})
export class VenderComponent implements OnInit {

  usuario : Usuario;
  email:any;
  criptos: any[] =[{
    nombre:"ETH"
 }];

  constructor() {
   
  }

  ngOnInit(): void {
  }


  venderCripto(cripto:string){

  }
}
