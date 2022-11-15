import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Usuario } from 'src/app/Models/Usuario';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';



@Component({
  selector: 'app-retiro',
  templateUrl: './retiro.component.html'
})
export class RetiroComponent implements OnInit {

  public saldoUsuario:number; 
  public usuario:Usuario;
  public cantidad:number = 0; 
  loading:boolean;
  loadingRetiro:boolean=false;
  usuarioAutenticado:any;
  movimiento:any[]=[];

  constructor(  private messageService:MessagesService,
    private usuarioService:UsuariosService,
    private auth:AuthService,
    private confirmationService: ConfirmationService,
    private transaccion : TransaccionesService) { 
    this.usuarioAutenticado=localStorage.getItem('email');
    
    this.loading=true;

    this.transaccion.getMovimientoPesos(this.usuarioAutenticado).subscribe((data:any)=>{
    this.movimiento = data.movimientos;
  });

  this.usuarioService.getUsuario(this.usuarioAutenticado).subscribe(data=>{
    this.usuario=data.payload.data();
    this.saldoUsuario= Number(data.payload.data()['saldo'].toFixed(2));
    this.loading=false;
  })
   }


  ngOnInit(): void {
  }

  retirarDinero(){
    if(this.cantidad<=0 || this.cantidad==undefined)
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
    
    this.confirmationService.confirm({
      message: 'Esta seguro que desea retirar $'+this.cantidad+' de Criptomanager?',
      accept: () => {
        this.loadingRetiro=true;
        this.usuarioService.updateUsuario(this.usuarioAutenticado,usuario).then(()=>{

          const retiro = {
            cantidad : this.cantidad,
            fecha: new Date(Date.now()),
            tipo : "RETIRO"
          };

        const retiroHistorico = {
          movimientos : [...this.movimiento,retiro]
        };
         
        this.transaccion.movimientoPesos(retiroHistorico,this.usuarioAutenticado);

          this.messageService.mensajeError('block1','info','Retiro Exitoso','Se retiró el dinero correctamente. En instantes se acreditará en su cuenta de mercado pago.');
          this.cantidad=0;
          this.loadingRetiro=false;
        });
      }
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
