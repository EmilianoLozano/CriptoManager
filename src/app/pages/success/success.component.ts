import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  status:string;

  constructor(private rutaActiva: ActivatedRoute) { 
   
  }

  ngOnInit(): void {
    this.rutaActiva.params.subscribe(params=>{
      console.log(params);
    });
   
  }

}
