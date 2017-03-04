import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseAuth } from 'angularfire2';

import { SparingObject } from '../sparing/sparing-object/sparing-object';
import { NySparing } from '../sparing/ny-sparing/ny-sparing';

import { FirebaseProvider } from '../../providers/firebase-provider';
import { WishlistService } from '../../providers/wishlist-service';




@Component({
  selector: 'page-sparing',
  templateUrl: 'sparing.html'
})

export class Sparing implements OnInit {

  nySparing = NySparing;

  sparingObjects: SparingObject[];
  selectedSparingObject: SparingObject;
  antallSparinger;
  
  lengthOfList;
  public sparingList: FirebaseListObservable<any>;

  constructor(
    public navcontroller: NavController, 
    public fbp: FirebaseProvider, 
    public wishProv: WishlistService
    ){
      let uid = fbp.auth.getAuth().uid;
      this.sparingList = fbp.af.database.list('/userData/' + uid + '/sparinger');
      console.log("Sparing constructor ran");
  }

  ngOnInit(): void {
	  
  }

  ionViewWillEnter() {
      console.log("Showing the Sparings-page!");

      /*Hva er dette til?.................
      this.sparingList = this.wishProv.getDataBasedOnCurrentUser();
      const sparingerLength$ =  this.sparingList
              .map(list => list.length);
      sparingerLength$.subscribe(length => {
            this.lengthOfList = length;
      })
      ...........................................*/
  }

  ionViewWillLeave() { 
      console.log("Left sparingside");
      this.lengthOfList = 0;
  }

  onSelect(sparingObject: SparingObject): void {
	  this.selectedSparingObject = sparingObject; 
  }

  deSelect (sparingObject: SparingObject): void {
	  this.selectedSparingObject = null;
  }
	
  defaultValue(sparingObject: SparingObject): void {
	  this.selectedSparingObject = {id: 0, name: "Ingen sparinger er registrert!",
					pris: 0, dato: "ingen"}; 
  }
	
  deleteSparingFirebase(sparingObject: SparingObject): void { //Works Online
      this.selectedSparingObject = sparingObject;
      this.wishProv.deleteBasedOnCurrentUser(this.selectedSparingObject);
      this.selectedSparingObject = null;
  }

  endreSparingPrisFirebase(sparingObject: SparingObject, pris: number): void {
    this.selectedSparingObject = sparingObject;
    this.wishProv.setSparingsPropertyPris(this.selectedSparingObject, pris);
  }


  
}


