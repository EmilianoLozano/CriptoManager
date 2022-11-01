import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  loading:boolean;
  rol:any;
  mostrarMenu: boolean=false;
  constructor(public authService: AuthService) {
    this.rol = localStorage.getItem('rol');
    if(this.rol == "ADMIN_ROLE")
      this.mostrarMenu=true;
   }

  ngOnInit(): void {
  }

  
}
