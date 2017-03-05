import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFire, FirebaseListObservable, FirebaseAuth } from 'angularfire2';
import * as fb from 'firebase';
/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FirebaseProvider {

  public fireAuth: any;
  public userDataVar: any;
  public userId: any;
  public databaseRef;
  public currentUserId = this.auth.getAuth().uid;

  public uncategorized_observable: FirebaseListObservable<any> = 
    this.af.database.list('/userData/' + this.currentUserId + '/uncategorized/');

  public expense_observable: FirebaseListObservable<any> =
    this.af.database.list('/userData/' + this.currentUserId + '/expense/');

  public income_observable: FirebaseListObservable<any> = 
    this.af.database.list('/userData/' + this.currentUserId + '/income/');

  constructor(
    public http: Http,
    public auth: FirebaseAuth,
    public af: AngularFire,
    ) {
    
    this.addTestTransactions();
  }

  doLogin(email: string, password: string): any {

    return this.af.auth.login({ email: email, password: password });;
  }

  register(email: string, password: string): any {
    return this.af.auth.createUser({email: email, password: password});
  }

  resetPassword(email: string, password: string): any {
    return fb.auth().sendPasswordResetEmail(email);
  }

  doLogout(): any {
    return this.af.auth.logout();
  }

  getCurrentUser() {
    return this.af.auth.getAuth().uid;
  }

  /* Returns a a promise of a Firebase list object as an array */
  getListAsArrayPromise(path: string) {
    let af = this.af;
    return new Promise(function(resolve) {
      let arr = new Array<any>();
      af.database.list(path).$ref.on("child_added", childs => { 
        childs.ref.once("value", obj => {
          let object = obj.val();
          object.$key = obj.key;
          arr.push(object);
        });
        let length = childs.numChildren();
        if (length == arr.length){
          resolve(arr);
        }
      });
    });
  }

  /* Adds four uncategorized transactions for demonstration purposes if there is none left.
  *  This is since we don't have an API from DNB to work with. 
  */
  addTestTransactions(){
    this.uncategorized_observable.subscribe(snapshots => {
      let count = 0;
      snapshots.forEach(snapshot => {
        count++;
      });
      if (count == 0){
        this.addUncategorizedTransaction("KIWI 547 FROGNER", "07.11.2016", "08:00", -179);
        this.addUncategorizedTransaction("NSB AS OSLO", "01.11.2016", "13:00", -781);
        this.addUncategorizedTransaction("DEWTEAM AS", "01.12.2016", "17:20", 1738);
        this.addUncategorizedTransaction("ARBEIDEREN AS OSLO", "03.12.2016", "15:45", 20738);
      }
    });
  }

  addForingToFirebase(category, title, amount, date, time) {
    this.af.database.list('/userData/' + this.currentUserId + '/expense/' + category)
      .push({title: title, date: date, time: time, amount: amount});
  }

  /* Adds an uncategorized transaction to the uncategorized Firebase category. 
  */  
   addUncategorizedTransaction(title: string, date: string, time: string, amount: number){
     this.uncategorized_observable.push({title: title, date: date, time: time, amount: amount});
   }

   deleteUncategorizedTransaction(objKey: string){
     this.uncategorized_observable.remove(objKey);
   }

   /* Categorizes a transaction based on the given parameters. 
   *  In Firebase: expense -> category -> "the expense object".
   */
  addExpense(category: string, title: string, date: string, time: string, amount: number){
    this.af.database.list('/userData/' + this.currentUserId + '/expense/' + category)
      .push({title: title, date: date, time: time, amount: amount});
  }

   /* Categorizes a transaction based on the given parameters. 
   *  In Firebase: income -> "vipps" or "lønn" -> "the income object".
   */
  addIncome(category: string, title: string, date: string, time: string, amount: number){
    this.af.database.list('/userData/' + this.currentUserId + '/income/' + category)
      .push({title: title, date: date, time: time, amount: amount})
  }

  /* Formats a date string to dd-mm-yyyy */
  formatDategroup(date: string): string{
    return date.replace(/[^a-zA-Z0-9]/g, '-');
  }

}
 