import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.transaction = navParams.data;
  }

  ionViewDidLoad() {
    console.log('Hello Kategoriser Page');
  }

}
