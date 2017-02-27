
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SparingObject } from '../sparing-object/sparing-object';
import { TimelineService } from '../../providers/timeline-service';
import { WishlistService } from '../../providers/wishlist-service';



@Component({
  selector: 'page-ny-sparing',
  templateUrl: 'ny-sparing.html'
})

export class NySparing implements OnInit{

  sparingObjects: SparingObject[];
  sparingObject: SparingObject;
  extName: string;
  extPris: number;
  extDato: string;
  
  @ViewChild(TimelineService) fbpViewChild: TimelineService;
	
  constructor(
    public navCtrl: NavController, 
    public fbp: TimelineService,
    public wishProv: WishlistService
    ) {}
	
  ngOnInit(): void {
	 
  }

  nySparingFirebase(id: number, name: string, pris: number, dato: string) { //THIS WORKS ONLINE!
    this.sparingObject = new SparingObject(3, this.extName, this.extPris, this.extDato);
    console.log(this.sparingObject);
    this.addToWishList(this.sparingObject); //THIS WORKS!
  }

  addToWishList(sparingObj) {
    this.wishProv.addWishList(sparingObj);
  }



}
