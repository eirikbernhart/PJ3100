
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SparingObject } from '../sparing-object/sparing-object';
import { FirebaseProvider } from '../../../providers/firebase-provider';
import { WishlistService } from '../../../providers/wishlist-service';



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
  
  @ViewChild(FirebaseProvider) fbpViewChild: FirebaseProvider;
	
  constructor(
    public navCtrl: NavController, 
    public fbp: FirebaseProvider,
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
