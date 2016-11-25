import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Tabs } from '../tabs/tabs';
import { NyBruker } from '../ny-bruker/ny-bruker';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {

  constructor(public navCtrl: NavController) {}
  
   goToOtherPage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(Tabs);
  }
  goToNyBruker() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(NyBruker);
  }

  ionViewDidLoad() {
    console.log('Hello Login Page');
  }

}
