import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-saldos',
  templateUrl: './saldos.component.html',
  styleUrls: ['./saldos.component.scss']
})
export class SaldosComponent implements OnInit {
  timestamp:number;

  constructor(private walletService:WalletService,
            private authService:AuthService) {
    walletService.getWallet(authService.userDataEmail).subscribe(data=>{
      this.timestamp=data.fecha_alta;
   


      // console.log(data.payload.data());
    });
   }

  ngOnInit(): void {
  }

}
