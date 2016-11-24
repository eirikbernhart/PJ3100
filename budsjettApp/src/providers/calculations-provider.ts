import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FirebaseProvider } from './firebase-provider';

/*
  Generated class for the CalculationsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CalculationsProvider {
  public fbp: FirebaseProvider;

  constructor(public http: Http) {}

  //Iterere gjennom hovedkategoriene og hente prisen fra verdiene i hver kategori 
  totalSumUtgifter(dato: Date){}

}
