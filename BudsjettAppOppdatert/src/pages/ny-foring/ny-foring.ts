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

  public dateVar = moment().tz("Europe/Berlin").format('MM/DD/YYYY');
  public dateWeekVar = moment().tz("Europe/Berlin").week().toString();
  public dateMonthVar = moment().tz("Europe/Berlin").format('MM/DD/YYYY').substring(0, 2);
  public timeVar = moment().tz("Europe/Berlin").format('HH:mm');

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public timeServ: TimelineService
    ) {}

  nyForingFirebase() {
  
        this.timeServ.addForingToFirebase(
          this.category, 
          this.extName, 
          this.extPris * (-1),
          this.dateVar,
          this.dateWeekVar,
          this.dateMonthVar,
          this.timeVar
        );
  }
}
