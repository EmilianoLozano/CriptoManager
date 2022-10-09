import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private checkout:CheckoutService) { }

  ngOnInit(): void {
  }

}
