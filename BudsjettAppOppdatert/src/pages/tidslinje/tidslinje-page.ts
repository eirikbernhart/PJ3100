import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TidslinjeForKategori } from '../tidslinje-for-kategori/tidslinje-for-kategori';
import  { Kategoriser } from '../kategoriser/kategoriser';
import { TimelineService } from '../../providers/timeline-service';
import { NyForingPage } from '../ny-foring/ny-foring';


@Component({
  selector: 'tidslinje-page',
  templateUrl: 'tidslinje-page.html'
})
export class TidsLinje {

  private uncategorized;
  public nyForing = NyForingPage;
  
  constructor (
    public navCtrl: NavController, 
    public timelineServ: TimelineService) {


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


  /* pushes an instance of TidslinjeForKategori on to the page stack 
  *  Takes two parameters, the category and a string "expense" or "income".
  */

  goToCategory(category: string, incomeOrExpense: string){
    var categoryObj: any = {title: category, incomeOrExpense: incomeOrExpense};
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
