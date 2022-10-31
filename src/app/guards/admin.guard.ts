import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Usuario } from '../Models/Usuario';
import { AuthService } from '../services/auth.service';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  usuario:Usuario;
  rol : any;
  constructor( private usuarioService: UsuariosService,
               private router: Router,
               private authService : AuthService ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
     
      this.rol= localStorage.getItem('rol');

      // this.usuarioService.get(this.authService.userDataEmail).subscribe((data:any)=>{
      //   this.usuario=data;
      // });

      if (this.rol === 'ADMIN_ROLE') {
        return true;
      } else {
        this.router.navigateByUrl('/dashboard');
        return false;
      };


  }
  
}
