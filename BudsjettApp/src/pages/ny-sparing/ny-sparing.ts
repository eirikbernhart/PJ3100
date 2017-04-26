
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SparingObject } from '../sparing-object/sparing-object';
import { TimelineService } from '../../providers/timeline-service';
import { WishlistService } from '../../providers/wishlist-service';

import * as moment from 'moment';
import 'moment-timezone';



@Component({
  selector: 'page-ny-sparing',
  templateUrl: 'ny-sparing.html'
})

export class NySparing implements OnInit{

  sparingObjects: SparingObject[];
  sparingObject: SparingObject;
  extName: string;
  extPrisTotal: number;
  extSpartPris: number = 0;
  extDato: string;

  public dateMin = moment().tz("Europe/Berlin").format('YYYY-MM-DD');
  public dateMax = moment().tz("Europe/Berlin").format('21.12.2100');

  public dateVar = moment().tz("Europe/Berlin").format('DD.MM.YYYY');
  public timeVar = moment().tz("Europe/Berlin").format('HH:mm');

  public event = {
    month: this.dateMin,
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }

  
  @ViewChild(TimelineService) fbpViewChild: TimelineService;
	
  constructor(
    public navCtrl: NavController, 
    public timeServ: TimelineService,
    public wishProv: WishlistService
    ) {}
	
  ngOnInit(): void {
	 
  }

  nySparingFirebase(id: number, name: string, prisTotal: number, spartPris: number, dato: string) { //THIS WORKS ONLINE!
    this.sparingObject = new SparingObject(3, this.extName, this.extPrisTotal, this.extSpartPris, this.event.month, "testValue");
    console.log(this.sparingObject);
    this.addToWishList(this.sparingObject); //THIS WORKS!
  }

  addToWishList(sparingObj) {
    this.wishProv.addWishList(sparingObj);
    /*this.wishProv.addSparingToFirebase(
      "other",
      "Satt av til sparing",
    0,
    0,
      this.dateVar,
      this.timeVar,
      this.sparingObject
    );*/
  }



}
