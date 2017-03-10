import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFire, FirebaseListObservable, FirebaseAuth } from 'angularfire2';
import * as fb from 'firebase';
import * as moment from 'moment';
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
  public currentUserId;

  public uncategorized_observable: FirebaseListObservable<any>;
  public expense_observable: FirebaseListObservable<any>;
  public income_observable: FirebaseListObservable<any>;
    

  constructor(
    public http: Http,
    public auth: FirebaseAuth,
    public af: AngularFire,
    ) { 
    
    this.af.auth.subscribe(user => {
      if (user)
        this.currentUserId = this.auth.getAuth().uid;
        this.uncategorized_observable = this.af.database.list('/userData/' + this.currentUserId + '/uncategorized/');
        this.expense_observable = this.af.database.list('/userData/' + this.currentUserId + '/expense/');
        this.income_observable = this.af.database.list('/userData/' + this.currentUserId + '/income/');
        this.addTestTransactions();
    })
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
    this.uncategorized_observable.$ref.once('value', snapshots => {
      let count = 0;
      snapshots.forEach(snapshot => { 
        count++;
        return false; 
      });

      let week = moment().isoWeek() + ''; 
      let date = moment().format('DD-MM-YYYY').replace('-', '.').replace('-', '.');
      if (count == 0){
        this.addUncategorizedTransaction("KIWI 547 FROGNER", date, "08:00", week, -179);
        this.addUncategorizedTransaction("NSB AS OSLO", date, "13:00", week, -781);
        this.addUncategorizedTransaction("DEWTEAM AS", date, "17:20", week, 1738);
        this.addUncategorizedTransaction("ARBEIDEREN AS OSLO", date, week, "15:45", 20738);
      }
    });
  }

  addForingToFirebase(category, title, amount, date, time) {

    let day = date.substr(0, 2);
    let month = date.substr(3, 2);
    let year = date.substr(6, 4);

    this.af.database.list('/userData/' + this.currentUserId + '/expense/')
      .push({title: title, date: date, time: time, amount: amount,
      day: day,
      month: month,
      year: year,
    });
  }

  /* Adds an uncategorized transaction to the uncategorized Firebase category. 
  */  
   addUncategorizedTransaction(title: string, date: string, time: string, week: string, amount: number){

      let day = date.substr(0, 2);
      let month = date.substr(3, 2);
      let year = date.substr(6, 5);

     this.uncategorized_observable.push({title: title, date: date, time: time, week: week, amount: amount,
      day: day,
      month: month,
      year: year,
    });
   }

   deleteUncategorizedTransaction(objKey: string){
     this.uncategorized_observable.remove(objKey);
   }

   /* Categorizes a transaction based on the given parameters. 
   *  In Firebase: expense -> category -> "the expense object".
   * Date parameter in format dd.mm.yyyy.
   */
  addExpense(category: string, title: string, date: string, time: string, week: string, amount: number){

    let day = date.substr(0, 2);
    let month = date.substr(3, 2);
    let year = date.substr(6, 4);

    this.af.database.list('/userData/' + this.currentUserId + '/expense/')
      .push({title: title, date: date, time: time, week: week, amount: amount,
        day: day,
        month: month,
        year: year,
        category: category
    });
  }

   /* Categorizes a transaction based on the given parameters. 
   *  In Firebase: income -> "vipps" or "lønn" -> "the income object".
   */
  addIncome(category: string, title: string, date: string, time: string, week: string, amount: number){

    let day = date.substr(0, 2);
    let month = date.substr(3, 2);
    let year = date.substr(6, 4); 

    this.af.database.list('/userData/' + this.currentUserId + '/income/')
      .push({title: title, date: date, time: time, week: week, amount: amount,
        day: day,
        month: month,
        year: year,
        category: category
    });
  }

  /* Formats a date string to dd-mm-yyyy */
  formatDategroup(date: string): string{
    return date.replace(/[^a-zA-Z0-9]/g, '-');
  }

}
 