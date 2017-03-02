import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable'
import { AngularFire, FirebaseListObservable, FirebaseAuth } from 'angularfire2';
import { FirebaseProvider } from './firebase-provider';

/*
  Generated class for the CalculationsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CalculationsProvider {

  currentUser;
  day;
  month;
  year;
  weekDay;
  foodAmountToday;
  foodAmountWeek;
  foodAmountMonth;
  
  constructor(public http: Http, private fbp: FirebaseProvider) {
    this.currentUser = firebase.auth().currentUser;
    this.day = new Date().getDate();
    this.month = new Date().getMonth() +1;
    this.year = new Date().getFullYear();
    this.weekDay = new Date().getDay();
    this.day = this.day < 10 ? "0" + this.day : this.day;
    this.month = this.month < 10 ? "0" + this.month : this.month;
    this.getTotalAmountOf("matOgDrikke", this.day + "." + this.month + "." + this.year, this.foodAmountToday);

    let monday = this.day - this.weekDay;
    for (let i = 0; i < this.weekDay; i++){
      this.getTotalAmountOf("matOgDrikke", (monday+i < 10) ? "0"+monday+i : monday+i  + "." + (this.month < 10) ? "0" + this.month : this.month + "." + this.year, this.foodAmountWeek);
    }

    for (let i = 1; i < this.day; i++){
      this.getTotalAmountOf("matOgDrikke", "" + i + "." + this.month + "." + this.year, this.foodAmountMonth);
    }
  }

  //Returns a promise of the total sum for each object.amount under a category ----Returnerer ikke riktig verdi (bug)
  getTotalAmountOf(category: string, date: string, sum: number) : Observable<void> {
    /* w/ uid:
    let entries = this.fbp.af.database.list('/userData/' 
    + this.currentUser.uid + '/expense/'*/
    let entries = this.fbp.af.database.list('/expense/' + category, {
      query: {
        orderByChild: 'date',
        equalTo: date
      }
    });


    return entries.map(x => { 
      sum = 0;
      x.forEach(i => { 
        sum += i.amount;
      });
    });
  }
}
