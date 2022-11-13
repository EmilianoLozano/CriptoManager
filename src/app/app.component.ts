import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'CriptoManager';

  constructor(private primengConfig: PrimeNGConfig,
    private translateService: TranslateService){

  }
  ngOnInit(): void {
    this.translateService.get('primeng').subscribe(res => {
      
      this.primengConfig.setTranslation(res)

    });
  }


}
