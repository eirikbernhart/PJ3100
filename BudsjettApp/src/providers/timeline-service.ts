import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable, FirebaseAuth, FirebaseDatabase } from 'angularfire2';
import { AuthService } from './auth-service';

import * as moment from 'moment';
import 'moment-timezone';

@Injectable()
export class TimelineService {

  public uncategorized: FirebaseListObservable<any>;
  staticArrayGuardian: FirebaseListObservable<any> ;

  public vipps: FirebaseListObservable<any>;
  public lønn: FirebaseListObservable<any>;

  public bolig: FirebaseListObservable<any>;
  public matOgDrikke: FirebaseListObservable<any>;
  public klærOgUtstyr: FirebaseListObservable<any>;
  public annet: FirebaseListObservable<any>;

  public currentUser = firebase.auth().currentUser; 


  //Data needed by calculation-service
  public getSumAnnet = 1200;
  public getSumFoodAndDrink = 3000;
  public getSumClothes = 800;
  public getSumIncome = 8000;


  constructor(
    public http: Http,
    private auth: FirebaseAuth,
    public af: AngularFire,
    public authServ: AuthService) {

      console.log("Timeline-constructor ran, with user: " + this.currentUser.uid);
         
}

  ionViewWillEnter() {
     
  }

  setUp() {

      this.currentUser = firebase.auth().currentUser; 

      this.uncategorized = this.af.database.list('/userData/' + this.currentUser.uid + '/uncategorized');

  }

  

  /* Adds an uncategorized transaction to the uncategorized Firebase category. 
  */  

  addUncategorizedTransaction(title: string, date: string, time: string, amount: number){

    // Get week number based on year, month, day.
    let dateFunc = moment();
    let day = parseInt(date.substring(0, 2));
    let month = parseInt(date.substring(3, 5));
    let year = parseInt(date.substring(6, 10));
    dateFunc.set('year', year);
    dateFunc.set('month', month); 
    dateFunc.set('date', day);
    let week = dateFunc.isoWeek();

    this.uncategorized.push({title: title, date: date, dateWeek: week, dateMonth: month, time: time, amount: amount});
   }


   deleteUncategorizedTransaction(objKey: string){
     this.af.database.list('/userData/' + this.currentUser.uid + '/uncategorized/' + objKey).remove();
   }


   /* Categorizes a transaction based on the given parameters. 
   *  In Firebase: expense -> category -> "the expense object".
   */
  addExpense(category: string, title: string, date: string, time: string, amount: number){

    // Get week number based on year, month, day.
    let dateFunc = moment();
    let day = parseInt(date.substring(0, 2));
    let month = parseInt(date.substring(3, 5));
    let year = parseInt(date.substring(6, 10));
    dateFunc.set('year', year);
    dateFunc.set('month', month);
    dateFunc.set('date', day);
    let week = dateFunc.isoWeek();

    this.af.database.list('/userData/' + this.currentUser.uid + '/expenses/')
      .push({title: title, date: date, dateWeek: week, dateMonth: month, time: time, amount: amount, category: category});
  }


  addForingToFirebase(category, title, amount, date, week, month, time) {

    this.af.database.list('/userData/' + this.currentUser.uid + '/expenses/')
      .push({title: title, date: date, dateWeek: week, dateMonth: month, time: time, amount: amount, category: category});

  }


   /* Categorizes a transaction based on the given parameters. 
   *  In Firebase: income -> "vipps" or "lønn" -> "the income object".
   */
  addIncome(title: string, date: string, time: string, amount: number){

    // Get week number based on year, month, day.
    let dateFunc = moment();
    let day = parseInt(date.substring(0, 2));
    let month = parseInt(date.substring(3, 5));
    let year = parseInt(date.substring(6, 10));
    dateFunc.set('year', year);
    dateFunc.set('month', month);
    dateFunc.set('date', day);
    let week = dateFunc.isoWeek();

    this.af.database.list('/userData/' + this.currentUser.uid + '/income/')
      .push({title: title, date: date, dateWeek: week, dateMonth: month, time: time, amount: amount, category: 'income'})
  }

  

  /* Formats a date string to dd-mm-yyyy */
  formatDategroup(date: string): string{
    return date.replace(/[^a-zA-Z0-9]/g, '-');
  }

  /* Returns a Firebase list object as a JSON object */
  getAsJSON(firebaseList: any){
    firebaseList
      .map(obj => obj.map(obj => {
        return obj;
      }));

  }

}
 