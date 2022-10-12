import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Models/Usuario';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';
import { UsuariosService } from 'src/app/services/usuarios.service';



@Component({
  selector: 'app-retiro',
  templateUrl: './retiro.component.html',
  styleUrls: ['./retiro.component.scss']
})
export class RetiroComponent implements OnInit {

  public saldoUsuario:number; 
  public usuario:Usuario;
  public cantidad:number; 
  constructor(  private messageService:MessagesService,
    private usuarioService:UsuariosService,
    private auth:AuthService) {
  // this.usuarioService.getUsuario(auth.userDataEmail).subscribe(data=>
  this.usuarioService.getUsuario('emilozano425@gmail.com').subscribe(data=>{
    this.usuario=data.payload.data();
    this.saldoUsuario= data.payload.data()['saldo'];
  })
   }


  ngOnInit(): void {
  }

  retirarDinero(){
    if(this.cantidad<=0 )
    {
      this.messageService.mensajeError('block1','error','Cantidad incorrecta','Indique la cantidad de dinero que desea retirar.');
      return;
    }
    const usuario = {
      nombre:this.usuario.nombre,
      apellido:this.usuario.apellido,
      dni:this.usuario.dni,
      saldo: this.usuario.saldo - this.cantidad,
      uid:this.usuario.uid,
      role:this.usuario.role,
      email:this.usuario.email
    }

    // this.usuarioService.updateUsuario(this.auth.userDataEmail,usuario).then(()=>{});
    
    this.usuarioService.updateUsuario('emilozano425@gmail.com',usuario).then(()=>{
      this.messageService.mensajeError('block1','info','Retiro Exitoso','Se retiró el dinero correctamente. En instantes se acreditará en su cuenta de mercado pago.');
      this.cantidad=0;
    });
  }

  precio(cant:any){
  
    if(this.cantidad>this.saldoUsuario)
    {
      this.cantidad=this.saldoUsuario;
    }
    cant.value=this.cantidad;
  }

}
