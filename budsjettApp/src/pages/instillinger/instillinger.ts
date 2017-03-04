import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase-provider'

/*
  Generated class for the Instillinger page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-instillinger',
  templateUrl: 'instillinger.html'
})
export class Instillinger {
   
  constructor(public navCtrl: NavController, public fbp: FirebaseProvider) {}

  ionViewDidLoad() {
    console.log('Hello Instillinger Page');
  }

  logout() {
    this.fbp.af.auth.logout();
  }

}
