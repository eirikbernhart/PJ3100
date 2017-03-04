import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NyForingObject } from './nyForing-object/nyForing-object';
import { FirebaseProvider } from '../../providers/firebase-provider';

import * as moment from 'moment';
import 'moment-timezone';


@Component({
  selector: 'page-ny-foring',
  templateUrl: 'ny-foring.html'
})
export class NyForingPage {


  nyForingObjects: NyForingObject[];
  nyForingObject: NyForingObject;

  extName: string;
  extPris: number;
  category: string;

  public timestampVar;
  public dateVar;
  public timeVar;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fbp: FirebaseProvider
    ) {
      moment.locale();
      this.timestampVar = moment().format('DD/MM/YYYY/HH:mm');
      this.dateVar = moment().format('DD/MM/YYYY');
      this.timeVar = moment().format('HH:mm');
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NyForingPage');
  }

  nyForingFirebase() {
      //console.log(this.myDateVar.toLocaleDateString());
     

      //console.log(moment().date());
      //console.log(moment().hour());
      //console.log(moment().day());
      
        this.fbp.addForingToFirebase(
          this.category, 
          this.extName, 
          this.extPris * (-1),
          this.dateVar,
          this.timeVar
        );
  }
}
