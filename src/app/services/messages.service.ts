import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private messageService: MessageService) { }

  mensajeError(key : string, severity:string,summary:string,detail:string){
    this.messageService.clear();
    this.messageService.add({
        key: key,
        severity: severity,
        summary: summary,
        detail:detail
    });
  }

  mensajeEmail(key : string, severity:string,summary:string,detail:string){
    this.messageService.clear();

    this.messageService.add({
        key: key,
        severity: severity,
        summary: summary,
        detail:detail
    });
  }

  mensajeExito(summary:string,detail:string){
    this.messageService.clear();
    this.messageService.add({key:'block2',severity:'success', summary:summary, detail:detail});
    // this.messageService.add({
    //     key: key,
    //     severity: 'success',
    //     summary: summary,
    //     detail:detail,
    //     contentStyleClass: 'p-3',
    //     closable:false
    // });
  }

}
