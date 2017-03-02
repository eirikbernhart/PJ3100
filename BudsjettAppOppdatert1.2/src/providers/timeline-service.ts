import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable, FirebaseAuth } from 'angularfire2';
import { AuthService } from './auth-service';

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
      console.log(this.currentUser.uid);

      this.uncategorized = this.af.database.list('/userData/' + this.currentUser.uid + '/uncategorized');
      this.staticArrayGuardian = this.af.database.list('/userData/' + this.currentUser.uid + '/static-array-guardian');

      /* 
      * This is an array of 8 transactions for demonstration purposes.
      * It uses a "guardian-node", to only inject a static array once.
      * This is since we don't have an API from DNB to work with. 
      */

       const staticGuardianLength$ = this.staticArrayGuardian
                .map(list => list.length);
      
        let mySubscription = staticGuardianLength$.subscribe(length => {
          
            console.log("Guardian's length inside subscribe is: " + length);

            if(length >= 1) {
                mySubscription.unsubscribe();
              }

             if(length < 1) {

              this.addUncategorizedTransaction("Spaceworld 345 Fornebu", "03.11.2016", "13:37", -599);
              this.addUncategorizedTransaction("H&M 344 SMESTAD", "04.11.2016", "16:23", -499);
              this.addUncategorizedTransaction("Dressmann 444 SMESTAD", "04.11.2016", "17:59", -399);
              this.addUncategorizedTransaction("KIWI 547 FROGNER", "07.11.2016", "08:00", -179);
              this.addUncategorizedTransaction("KIWI 547 FROGNER", "08.11.2016", "11:22", -237);
              this.addUncategorizedTransaction("NSB AS OSLO", "08.11.2016", "13:00", -781);
              this.addUncategorizedTransaction("DEVTEAM AS", "12.12.2016", "17:20", 1738);
              this.addUncategorizedTransaction("ARBEIDEREN AS OSLO", "16.12.2016", "15:45", 20738);  
              
              let guardianRef = 'Guardian is on duty!'; 
              this.staticArrayGuardian.push(guardianRef);

              
              
          }            
        })
  }

  

  /* Adds an uncategorized transaction to the uncategorized Firebase category. 
  */  

  addUncategorizedTransaction(title: string, date: string, time: string, amount: number){
     this.uncategorized.push({title: title, date: date, time: time, amount: amount});
   }


   deleteUncategorizedTransaction(objKey: string){
     this.af.database.list('/userData/' + this.currentUser.uid + '/uncategorized/' + objKey).remove();
   }


   /* Categorizes a transaction based on the given parameters. 
   *  In Firebase: expense -> category -> "the expense object".
   */
  addExpenseToExternalList(category: string, title: string, date: string, time: string, amount: number){
    this.af.database.list('/userData/' + this.currentUser.uid + '/expenseExternalList/' + category)
      .push({title: title, date: date, time: time, amount: amount});
  }

  addForingToFirebase(category, title, amount, date, week, month, time) {
    this.af.database.list('/userData/' + this.currentUser.uid + '/expenseFlatened/')
      .push({title: title, date: date, dateWeek: week, dateMonth: month, time: time, amount: amount, category: category});

      this.af.database.list('/userData/' + this.currentUser.uid + '/expenseExternalList/' + category)
      .push({title: title, date: date, time: time, amount: amount});
  }

   /* Categorizes a transaction based on the given parameters. 
   *  In Firebase: income -> "vipps" or "lønn" -> "the income object".
   */
  addIncome(category: string, title: string, date: string, time: string, amount: number){
    this.af.database.list('/userData/' + this.currentUser.uid + '/income/' + category)
      .push({title: title, date: date, time: time, amount: amount})
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
 