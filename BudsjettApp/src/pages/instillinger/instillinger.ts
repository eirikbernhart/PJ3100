import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-instillinger',
  templateUrl: 'instillinger.html'
})
export class Instillinger {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Instillinger Page');
  }

}
