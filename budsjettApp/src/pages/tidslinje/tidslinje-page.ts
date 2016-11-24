import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TidslinjeForKategori } from '../tidslinje-for-kategori/tidslinje-for-kategori';
import  { Kategoriser } from '../kategoriser/kategoriser';
import { FirebaseProvider } from '../../providers/firebase-provider';

@Component({
  selector: 'tidslinje-page',
  templateUrl: 'tidslinje-page.html'
})
export class TidsLinje {

  private uncategorized;
  
  constructor(public navCtrl: NavController, public fbp: FirebaseProvider) {

    this.uncategorized = this.fbp.uncategorized;

  }

  /* pushes an instance of TidslinjeForKategori on to the page stack 
  *  Takes two parameters, the category and a string "expense" or "income".
  */
  goToCategory(category: string, incomeOrExpense: string){
    var categoryObj: any = {title: category, incomeOrExpense: incomeOrExpense};
    this.navCtrl.push(TidslinjeForKategori, categoryObj);
  }

  /* pushes an instance of Kategoriser to the page stack 
  */
  categorize(transaction){
    this.navCtrl.push(Kategoriser, transaction);
  }
}
