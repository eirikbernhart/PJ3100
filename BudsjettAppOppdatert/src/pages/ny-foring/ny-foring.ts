import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NyForingObject } from '../nyForing-object/nyForing-object';
import { TimelineService } from '../../providers/timeline-service';

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

  public timestampVar = moment().tz("Europe/Berlin").format('DD/MM/YYYY/HH:mm');
  public dateVar = moment().tz("Europe/Berlin").format('DD/MM/YYYY');
  public timeVar = moment().tz("Europe/Berlin").format('HH:mm');

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public timeServ: TimelineService
    ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NyForingPage');
  }

  nyForingFirebase() {
      //console.log(this.myDateVar.toLocaleDateString());
     

      //console.log(moment().date());
      //console.log(moment().hour());
      //console.log(moment().day());
      
        this.timeServ.addForingToFirebase(
          this.category, 
          this.extName, 
          this.extPris * (-1),
          this.dateVar,
          this.timeVar
        );
  }
}
