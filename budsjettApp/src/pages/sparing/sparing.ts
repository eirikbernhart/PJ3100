import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NySparing } from '../ny-sparing/ny-sparing';

/*
  Generated class for the Sparing page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sparing',
  templateUrl: 'sparing.html'
})
export class Sparing {
  nySparing = NySparing;

  constructor(public navCtrl: NavController) {
  }

}
