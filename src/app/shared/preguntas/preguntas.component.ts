import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss']
})
export class PreguntasComponent implements OnInit {

  loading:boolean=true;

  constructor(private router: Router) {
    setTimeout(() => {
      this.loading=false;
    }, 10);
   }

  ngOnInit(): void {
  }

  volver(){
    this.router.navigateByUrl("inicio");
  }

}
