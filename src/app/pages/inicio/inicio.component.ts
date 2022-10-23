import { Component, OnInit } from '@angular/core';
import { ApiCriptomonedasService } from 'src/app/services/api-criptomonedas.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  cotDolar:number;
  usuarioAutenticado:any;

  constructor(private api_criptos : ApiCriptomonedasService) { 
    this.api_criptos.getCotizacionDolar().subscribe((data:any)=>{
      localStorage.setItem('dolar',data.ask);
      this.cotDolar= data.ask;
       });
  }
 

  ngOnInit(): void {
  }

}
