import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  displayBasic2: boolean;
  year:number;
  constructor(private router : Router) { 
    const fechaActual= new Date(Date.now()) ;
    this.year=fechaActual.getFullYear();
  }

  ngOnInit(): void {
  }


  irAPreguntas(){
    this.router.navigateByUrl("/preguntasFrecuentes");
  }


  showBasicDialog2() {
    this.displayBasic2 = true;
}

}
