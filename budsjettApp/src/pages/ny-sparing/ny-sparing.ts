import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the NySparing page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ny-sparing',
  templateUrl: 'ny-sparing.html'
})
export class NySparing {

  constructor(public navCtrl: NavController) {}

  nySparing(){
    //Hva skal skje når man trykker submit (ok)
    this.navCtrl.pop;
  }

}
