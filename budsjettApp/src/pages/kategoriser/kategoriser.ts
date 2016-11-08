import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase-provider';
/*
  Generated class for the Kategoriser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-kategoriser',
  templateUrl: 'kategoriser.html'
})
export class Kategoriser {

  transaction: any;
  title: string;
  amount: number;
  category: string = "matOgDrikke";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public fbp: FirebaseProvider) {

    this.transaction = navParams.data;
  }

  ionViewDidLoad() {
    console.log('Hello Kategoriser Page');
  }

  submit(){
    if (this.title == null)
      this.title = this.transaction.title;
    if (this.amount == null)
      this.amount = this.transaction.amount;

    this.fbp.addExpense(this.category, this.title, this.transaction.date, this.amount);
    this.transaction.remove(); //Fjern fra uncategorized
  }

}
