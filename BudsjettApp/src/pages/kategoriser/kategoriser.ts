import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TimelineService } from '../../providers/timeline-service';

import * as moment from 'moment';
import 'moment-timezone';



@Component({
  selector: 'page-kategoriser',
  templateUrl: 'kategoriser.html'
})
export class Kategoriser {

  type: string;
  transaction: any;
  title: string;
  amount: number;
  category: string;
  public date = moment().tz("Europe/Berlin").format('MM/DD/YYYY');
  public time = moment().tz("Europe/Berlin").format('HH:mm');

  public currentUser = firebase.auth().currentUser;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public fbp: TimelineService) {

    this.transaction = navParams.data;


    if (this.transaction.amount < 0)
      this.type = 'Utgift';
    else
      this.type = 'Lønn';

  }

  ionViewDidLoad() {
    console.log(this.transaction);
  }

  submit(){
    if (this.title == null)
      this.title = this.transaction.title;
    if (this.amount == null)
      this.amount = this.transaction.amount;

    if (this.amount < 0){
      this.fbp.addExpenseToExternalList(this.category, this.title, this.transaction.date, this.transaction.time, this.amount);

    } else {
      this.fbp.addIncome('lønn', this.title, this.transaction.date, this.transaction.time, this.amount);
    }
    

    this.fbp.af.database.object('/userData/' + this.currentUser.uid + '/uncategorized/' + this.transaction.$key).remove(); //Fjern fra uncategorized*/
  }

}
