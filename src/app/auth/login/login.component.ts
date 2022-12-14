import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { delay, Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';
import { MessagesService } from 'src/app/services/messages.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit , OnDestroy{
  usuario:any;
  activo : boolean;
  logueobien:boolean= false;;
  loading:boolean=false;
  usuarioSubscription : Subscription;
  email:any | null ;
  password:any | null;
  loginForm:FormGroup;
  isPosted:boolean= false;
  constructor(public authService:AuthService,private firebase_error:FirebaseErrorService,
            private router:Router,private messageService:MessagesService,
            private usuarioService:UsuariosService,
            private fb : FormBuilder) { 
              this.loginForm = this.fb.group({
                email:['', Validators.required ],
                pass : ['', Validators.required ]
              });

            }
  ngOnDestroy(): void {
    
    if(this.usuarioSubscription!=null){
      this.usuarioSubscription.unsubscribe();
    }

  }
 

  ngOnInit(): void {
    console.log(this.loginForm);
  }

  iniciarSesion(){
 
  this.isPosted=true;
  if(this.loginForm.controls['email'].value == "")
  {
    this.messageService.mensajeError('block2','error','Error en inicio de sesión','Por favor ingrese un email.');
    return;
  }

  if(this.loginForm.controls['pass'].value == "")
  {
    this.messageService.mensajeError('block2','error','Error en inicio de sesión','Por favor ingrese una contraseña.');
    return;
  }

  this.email = this.loginForm.controls['email'].value;
  this.password = this.loginForm.controls['pass'].value;

  this.loading=true;

  this.usuarioSubscription = this.usuarioService.getUsuario(this.email).subscribe(data=>{
    this.usuario=data.payload.data();
    if(this.usuario!=undefined)
    {
      if(!this.usuario.activo)
      {
        this.messageService.mensajeError('block2','error','Error en inicio de sesión','El usuario fue dado de baja. Comuniquese con el administrador.');
        this.loading=false;
        return;
      }

    }
    else
    {
      this.messageService.mensajeError('block2','error','Error en inicio de sesión','El usuario no esta registrado.');
      this.loading=false;
      return;
    }
   

    this.logueobien=true;
    if(this.logueobien){
      
      this.iniciarAuth(this.email,this.password);
        
      }
  });

  }

   
  iniciarAuth(email:string,password:string){
    this.usuarioSubscription.unsubscribe();

    this.authService.SignIn(email,password)
        .then((result) => {
          if(!result.user?.emailVerified){
            this.messageService.mensajeError('block2','error','Error en inicio de sesión','Debe verificar su usuario. Revisa tu casilla de correo.');
            this.loading=false;
            return;
          }
          this.authService.afAuth.authState.subscribe((user) => {
          
            if (user) {
              this.loading=false;
              this.isPosted=false;
              localStorage.setItem('rol',this.usuario.role);
              localStorage.setItem('email', this.authService.userDataEmail);
              setTimeout(()=>{
                if(this.usuario.role =="ADMIN_ROLE")
                {
                  this.router.navigate(['dashboard/criptomonedas']);
                }
                else
                {
                  this.router.navigate(['dashboard/inicio']);                  
                }
                
              },100);        

            }
          });
        })
        .catch((error) => {
          this.loading=false;
          this.messageService.mensajeError('block2','error','Error en inicio de sesión',this.firebase_error.controlarErrorFirebase(error.code));
        });
  }



    
  
  
  
}
