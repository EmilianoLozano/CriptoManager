import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RouterLinkActive} from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
  }

}
