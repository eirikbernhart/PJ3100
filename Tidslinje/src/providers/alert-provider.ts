import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';


@Injectable()
export class AlertProvider {

  constructor(public http: Http, public alertCtrl: AlertController) {
  }
	
	doAlert() {
	  let alert = this.alertCtrl.create({
		  title: 'New Friend!',
		  subTitle: 'Your friend, Obi Wan Kenobi, just accepted your friend request!',
		  buttons: ['OK']
	  });
	  alert.present();
  }

}
