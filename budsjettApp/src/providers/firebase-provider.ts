import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable, FirebaseAuth } from 'angularfire2';


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

<<<<<<< HEAD

      this.uncategorized = this.af.database.list('/uncategorized');

    /* Adds two uncategorized transactions for demonstration purposes.
    *  This is since we don't have an API from DNB to work with. 
    */
    this.af.database.list('/uncategorized', { preserveSnapshot: true }).subscribe(snapshots => {
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

  /* Adds an uncategorized transaction to the uncategorized Firebase category. 
  */  

=======
    this.uncategorized = this.af.database.list('/uncategorized');

    if (this.uncategorized.$ref.equalTo(null)){
    this.addUncategorizedTransaction("KIWI 547 FROGNER", "07.11.2016", "08:00", -179);
    this.addUncategorizedTransaction("NSB AS OSLO", "08.11.2016", "21:00", -738);
    }

  }
  
>>>>>>> e0da23be4f47a2cb94756eacff29a820ed0776d8
  addUncategorizedTransaction(title: string, date: string, time: string, amount: number){
     this.uncategorized.push({title: title, date: date, time: time, amount: amount});
   }

<<<<<<< HEAD

   /* Categorizes a transaction based on the given parameters. 
   *  In Firebase: expense -> category -> "the expense object".
   */
  addExpense(category: string, title: string, date: string, time: string, amount: number){
    this.af.database.list('/expense/' + category)
      .push({title: title, date: date, time: time, amount: amount});
  }

   /* Categorizes a transaction based on the given parameters. 
   *  In Firebase: income -> "vipps" or "lønn" -> "the income object".
   */
  addIncome(category: string, title: string, date: string, time: string, amount: number){
    this.af.database.list('/income/' + category)
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

=======
  addExpense(category: string, title: string, date: string, time: string, amount: number){
     this.af.database.list('/expense/' + category).push({title: title, date: date, time: time, amount: amount});
>>>>>>> e0da23be4f47a2cb94756eacff29a820ed0776d8
  }

}
 