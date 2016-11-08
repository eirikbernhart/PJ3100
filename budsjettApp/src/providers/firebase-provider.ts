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
  public income: FirebaseListObservable<any>;
  public expense: FirebaseListObservable<any>;

  constructor(
    public http: Http,
    private auth: FirebaseAuth,
    private af: AngularFire) {

    this.uncategorized = this.af.database.list('/uncategorized');
    this.income = this.af.database.list('/income');
    this.expense = this.af.database.list('/expense');

    if (this.uncategorized == null){
    this.addUncategorizedTransaction("KIWI 547 FROGNER", "07.11.2016", -179);
    this.addUncategorizedTransaction("NSB AS OSLO", "08.11.2016", -738);
    }

  }
  
  addUncategorizedTransaction(title: string, date: string, amount: number){
     this.uncategorized.push({title: title, date: date, amount: amount});
   }

}
