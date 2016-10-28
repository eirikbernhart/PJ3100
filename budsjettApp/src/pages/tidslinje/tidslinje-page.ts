import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'tidslinje-page',
  templateUrl: 'tidslinje-page.html'
})
export class TidsLinje {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello TestPage Page');
  }
}
