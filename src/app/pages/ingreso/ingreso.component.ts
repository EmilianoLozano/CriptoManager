import { Component, OnInit } from '@angular/core';

import { CheckoutService } from '../../services/checkout.service';

import { get } from 'scriptjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/Models/Usuario';
import { delay, Subscription } from 'rxjs';
import { fakeAsync } from '@angular/core/testing';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.scss']
})
export class IngresoComponent implements OnInit {

  init_point: any;
  
  public ingresoForm: FormGroup;
  public saldoUsuario:number;
  public usuario:Usuario;
  loading:boolean=false;
  usuarioSubscription:Subscription;

  // TARJETA DE CREDITO   4509 9535 6623 3704   COD_SEG: 123  11/25

  constructor(private checkoutService: CheckoutService,
              private fb : FormBuilder,
              private messageService:MessagesService,
              private usuarioService:UsuariosService,
              private auth:AuthService) 
              {   
                this.ingresoForm = this.fb.group({
                 cantidad: [0,Validators.required]
                });
                // this.usuarioService.getUsuario(auth.userDataEmail).subscribe(data=>
              

              }

  ngOnInit(): void {
   
    get("https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js", () => {
      //library has been loaded...
    });
    this.usuarioSubscription = this.usuarioService.getUsuario('emilozano425@gmail.com').subscribe(data=>{
      console.log(data);
      this.usuario=data.payload.data();
      this.saldoUsuario= data.payload.data()['saldo'];
     
    });
   
  }

  onBuy() {
    this.usuarioSubscription.unsubscribe();
    if(this.ingresoForm.get('cantidad')?.value==0 || this.ingresoForm.get('cantidad')?.value<=0 )
    {
      this.messageService.mensajeError('block1','warn','Cantidad incorrecta','Ingrese una cantidad de dinero a ingresar correcta.' );
      return;
    }
    const preference = {
      items: [
          {
              title: 'Pesos',
              unit_price: this.ingresoForm.get('cantidad')?.value,
              quantity: 1
          },
      ],
      back_urls: {
                success: "http://localhost:4200/dashboard/success"
              }
    };
    this.loading=true;

    this.checkoutService.goCheckOut(preference).subscribe((result:any) => {
      // Read result of the Cloud Function.
    
      this.init_point = result.result;

      const usuario = {
        nombre:this.usuario.nombre,
        apellido:this.usuario.apellido,
        dni:this.usuario.dni,
        saldo: this.usuario.saldo + this.ingresoForm.get('cantidad')?.value,
        uid:this.usuario.uid,
        role:this.usuario.role,
        email:this.usuario.email
      }
  
      this.usuarioService.updateUsuario('emilozano425@gmail.com',usuario).then(()=>{
        window.location.href = this.init_point;
      });


      //window.open(this.init_point);
      // this.usuarioService.updateUsuario(this.auth.userDataEmail,usuario).then(()=>{});
   
    });
 
  }


}
