import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Class to logg messages from providers
*/
@Injectable()
export class DataLogger {

  public messages: Array<string>;
  constructor(){
    this.messages = new Array<string>();
  }
  public log(){
    console.log('DataLogger: ')
    for (let key in this.messages){
      console.log(this.messages[key]);
    }
    console.log('DataLogger end.........................')
  }

  public add(message: string){
    this.messages.push(message);
  }

}
