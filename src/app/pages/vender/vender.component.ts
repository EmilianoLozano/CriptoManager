import { Component, OnInit } from '@angular/core';
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
  
  constructor(private usuarioService:UsuariosService,
              private authService:AuthService) {
    this.email= localStorage.getItem('email');
    console.log(this.email);
    //this.usuarioService.getUsuario(this.authService.userDataEmail).subscribe(data=>{
    this.usuarioService.getUsuario(this.email).subscribe(data=>{
        this.usuario = data.payload.data();
    });
  }

  ngOnInit(): void {
  }

}
