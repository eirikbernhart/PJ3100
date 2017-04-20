import { Component, OnInit, ViewChildren } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseAuth } from 'angularfire2';


import { SparingObject } from '../sparing-object/sparing-object';
import { NySparing } from '../ny-sparing/ny-sparing';

import { TimelineService } from '../../providers/timeline-service';
import { WishlistService } from '../../providers/wishlist-service';




@Component({
  selector: 'page-sparing',
  templateUrl: 'sparing.html'
})

export class Sparing implements OnInit {

   @ViewChildren('sparinger') sparinger;

  nySparing = NySparing;

  sparingObjects: SparingObject[];
  selectedSparingObject: SparingObject;
  antallSparinger;
  
  lengthOfList;
  public sparingList;

  //Styling
  isActive: boolean = false;
  selectedIndex = 0;

  constructor(
    public navcontroller: NavController, 
    public fbp: TimelineService, 
    public wishProv: WishlistService
    ){
      console.log("Sparing constructor ran");
  }

  ngOnInit(): void {
	  
  }

  ionViewWillEnter() {
      console.log("Showing the Sparings-page!");
      this.sparingList = this.wishProv.getDataBasedOnCurrentUser();
      const sparingerLength$ =  this.sparingList
              .map(list => list.length);
      sparingerLength$.subscribe(length => {
            this.lengthOfList = length;
      })
  }

  ionViewWillLeave() { 
      console.log("Left sparingside");
      this.lengthOfList = 0;
  }
  
 

  ngAfterViewInit() {
    console.log("Sparinger index 0: " + this.sparinger);
  }

  

  onSelect(sparingObject: SparingObject): void {
	  this.selectedSparingObject = sparingObject; 
  }

  deSelect (sparingObject: SparingObject): void {
	  this.selectedSparingObject = null;
  }
	
  defaultValue(sparingObject: SparingObject): void {
	  this.selectedSparingObject = {id: 0, name: "Ingen sparinger er registrert!",
					prisTotal: 0, dato: "ingen"}; 
  }
	
  deleteSparingFirebase(sparingObject: SparingObject): void { //Works Online
      this.selectedSparingObject = sparingObject;
      this.wishProv.deleteBasedOnCurrentUser(this.selectedSparingObject);
      this.selectedSparingObject = null;
  }

  endreSparingPrisFirebase(sparingObject: SparingObject, pris: number): void {
    this.selectedSparingObject = sparingObject;
    this.wishProv.setSparingsPropertyPrisSpart(this.selectedSparingObject, pris);
  }


  
}


