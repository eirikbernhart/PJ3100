import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable, FirebaseAuth } from 'angularfire2';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FirebaseProvider {

  public uncategorized: FirebaseListObservable<any>;

  public vipps: FirebaseListObservable<any>;
  public lønn: FirebaseListObservable<any>;

  public bolig: FirebaseListObservable<any>;
  public matOgDrikke: FirebaseListObservable<any>;
  public klærOgUtstyr: FirebaseListObservable<any>;
  public annet: FirebaseListObservable<any>;

  constructor(
    public http: Http,
    private auth: FirebaseAuth,
    public af: AngularFire) {

    this.uncategorized = this.af.database.list('/uncategorized');

    if (this.uncategorized.$ref.equalTo(null)){
    this.addUncategorizedTransaction("KIWI 547 FROGNER", "07.11.2016", "08:00", -179);
    this.addUncategorizedTransaction("NSB AS OSLO", "08.11.2016", "21:00", -738);
    }

  }
  
  addUncategorizedTransaction(title: string, date: string, time: string, amount: number){
     this.uncategorized.push({title: title, date: date, time: time, amount: amount});
   }

  addExpense(category: string, title: string, date: string, time: string, amount: number){
     this.af.database.list('/expense/' + category).push({title: title, date: date, time: time, amount: amount});
  }

}
 