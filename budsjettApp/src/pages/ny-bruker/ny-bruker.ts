import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Tabs } from '../tabs/tabs';

/*
  Generated class for the NyBruker page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ny-bruker',
  templateUrl: 'ny-bruker.html'
})
export class NyBruker {

  constructor(public navCtrl: NavController) {}
  
  goToOtherPage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(Tabs);
    }

  ionViewDidLoad() {
    console.log('Hello NyBruker Page');
  }

}
