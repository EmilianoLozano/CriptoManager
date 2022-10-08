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
        detail:detail,
        contentStyleClass: 'p-3',
        closable:false
    });
  }

  mensajeEmail(key : string, severity:string,summary:string,detail:string){
    this.messageService.clear();
    this.messageService.add({
        key: key,
        severity: severity,
        summary: summary,
        detail:detail,
        styleClass: 'surface-overlay',
        contentStyleClass: 'p-3',
        closable:false
    });
  }

  mensajeExito(key : string, summary:string,detail:string){
    this.messageService.clear();
    this.messageService.add({
        key: key,
        severity: 'success',
        summary: summary,
        detail:detail,
        contentStyleClass: 'p-3',
        closable:false
    });
  }

}
