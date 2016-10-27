import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { AlertController } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert-provider';


@Component({
  selector: 'page-test-page',
  templateUrl: 'test-page.html'
})
export class TestPage {

  constructor(public navCtrl: NavController, public alertProvider: AlertProvider) {}

  ionViewDidLoad() {
    console.log('Hello TestPage Page');
  }
	
  /*doAlert() {
	  let alert = this.alertCtrl.create({
		  title: 'New Friend!',
		  subTitle: 'Your friend, Obi Wan Kenobi, just accepted your friend request!',
		  buttons: ['OK']
	  });
	  alert.present();
  }*/

}
