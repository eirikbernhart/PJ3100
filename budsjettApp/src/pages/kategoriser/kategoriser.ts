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

<<<<<<< HEAD
  type: string;
=======
>>>>>>> e0da23be4f47a2cb94756eacff29a820ed0776d8
  transaction: any;
  title: string;
  amount: number;
  category: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public fbp: FirebaseProvider) {

    this.transaction = navParams.data;
<<<<<<< HEAD


    if (this.transaction.amount < 0)
      this.type = 'Utgift';
    else
      this.type = 'Lønn';

=======
>>>>>>> e0da23be4f47a2cb94756eacff29a820ed0776d8
  }

  ionViewDidLoad() {
    console.log(this.transaction);
  }

  submit(){
    if (this.title == null)
      this.title = this.transaction.title;
    if (this.amount == null)
      this.amount = this.transaction.amount;

<<<<<<< HEAD
    if (this.amount < 0){
      this.fbp.addExpense(this.category, this.title, this.transaction.date, this.transaction.time, this.amount);

    } else {
      this.fbp.addIncome('lønn', this.title, this.transaction.date, this.transaction.time, this.amount);
    }
    

=======
    this.fbp.addExpense(this.category, this.title, this.transaction.date, this.transaction.time, this.amount);
>>>>>>> e0da23be4f47a2cb94756eacff29a820ed0776d8
    this.fbp.af.database.object('/uncategorized/' + this.transaction.$key).remove(); //Fjern fra uncategorized
  }

}
