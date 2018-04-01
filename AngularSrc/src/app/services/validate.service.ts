import { Injectable } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class ValidateService {

  constructor(private _flashMessagesService: FlashMessagesService) { }

  formSubmitMessage(msg, msgType = 'danger') {
    this._flashMessagesService.show(msg, { cssClass: `flash-${msgType}`, timeout: 4000 });
  }

}
