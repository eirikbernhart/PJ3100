import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TidslinjeForKategori } from '../tidslinje-for-kategori/tidslinje-for-kategori';
import  { Kategoriser } from '../kategoriser/kategoriser';
import { TimelineService } from '../../providers/timeline-service';
import { NyForingPage } from '../ny-foring/ny-foring';

import * as moment from 'moment';
import 'moment-timezone';

@Component({
  selector: 'tidslinje-page',
  templateUrl: 'tidslinje-page.html'
})
export class TidsLinje {

  private uncategorized;
  public nyForing = NyForingPage;
  
  constructor (
    public navCtrl: NavController, 
    public timelineServ: TimelineService
    ) {


    //this.uncategorized = this.timelineServ.uncategorized;
   

  }

  ionViewWillEnter() {
      console.log("Tidslinje-page is showing");
      this.timelineServ.setUp();
      this.uncategorized = this.timelineServ.uncategorized;
  }

  ionViewWillLeave() { 
      console.log("Left Tidslinje-page");
      //this.uncategorized = null;
      
  }

  addDemoTransactions(){

    let dateFunc = moment().tz('Europe/Oslo');
    let year = dateFunc.year();
    let month: any = dateFunc.month() +1;
    let day: any = dateFunc.date();

    //make day and month show with at least 2 digits (01-09).
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    /* 
    * This adds 8 transactions for demonstration purposes.
    * This is since we don't have an API from DNB to work with. 
    */
    this.timelineServ.uncategorized.remove();
    this.timelineServ.addUncategorizedTransaction("Spaceworld 345 Fornebu", day + '.' + month + '.' + year, "13:37", -599);
    this.timelineServ.addUncategorizedTransaction("H&M 344 SMESTAD", day + '.' + month + '.' + year, "16:23", -499);
    let newday: any = parseInt(day) + 1; //Increase day by one for testing purposes.
    newday = newday < 10 ? '0' + newday : newday;
    this.timelineServ.addUncategorizedTransaction("Dressmann 444 SMESTAD", newday + '.' + month + '.' + year, "17:59", -399);
    this.timelineServ.addUncategorizedTransaction("KIWI 547 FROGNER", newday + '.' + month + '.' + year, "08:00", -179);
    let newmonth: any = parseInt(month) + 1; //Increase month by one.
    newmonth = newmonth < 10 ? '0' + newmonth : newmonth;
    this.timelineServ.addUncategorizedTransaction("KIWI 547 FROGNER", day + '.' + newmonth + '.' + year, "11:22", -237);
    this.timelineServ.addUncategorizedTransaction("NSB AS OSLO", day + '.' + newmonth + '.' + year, "13:00", -781);

    //Income
    this.timelineServ.addUncategorizedTransaction("IT ekspert LØNN", day + '.' + month + '.' + year, "13:37", 40000);
    this.timelineServ.addUncategorizedTransaction("INNTEKT FRA VIPPS", day + '.' + month + '.' + year, "16:23", 499);
  }

  /* pushes an instance of TidslinjeForKategori on to the page stack 
  *  Takes two parameters, the category and a string "expense" or "income".
  */

  goToCategory(title: string, category: string, incomeOrExpense: string){
    var categoryObj: any = {title: title, category: category, incomeOrExpense: incomeOrExpense};
    this.navCtrl.push(TidslinjeForKategori, categoryObj);
  }


  deleteTransaction(objKey: string){
    this.timelineServ.deleteUncategorizedTransaction(objKey);
  }


  /* pushes an instance of Kategoriser to the page stack 
  */

  categorize(transaction){
    this.navCtrl.push(Kategoriser, transaction);
  }
}
