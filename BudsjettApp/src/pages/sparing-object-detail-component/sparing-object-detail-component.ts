import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SparingObject } from '../../pages/sparing-object/sparing-object';
import { Sparing } from '../sparing/sparing';
import { WishlistService } from '../../providers/wishlist-service';


@Component({
  selector: 'sparing-detail-component',
  templateUrl: 'sparing-object-detail-component.html'
})
export class SparingObjectDetailComponent {

  public prisToSet;
  public sparingsVerdi: number;

  constructor(
    public navCtrl: NavController, 
    public sparing: Sparing,
    public wishProv: WishlistService
    ) {
      console.log("Sparing-object-component constructor ran!");
    }

    

  @Input()
  sparingObject: SparingObject;
  sparingObject2: SparingObject;

  
  
  
  setActive() {
    if(this.sparing.isActive == true) {
      this.sparing.isActive = false;
    } else {
      this.sparing.isActive = true;
    }
  }

  addToSparing(val: number) {
    this.wishProv.setSparingsPropertyPrisSpart(this.sparingObject ,val); 
    //this.wishProv.setSparingsPropertyPrisSpart2(this.sparingObject ,val); 
    this.sparingsVerdi = null;
  } 

  deleteSparing(SparingObject: SparingObject) {
    this.sparing.deleteSparingFirebase(this.sparingObject);
    //this.wishProv.setSparingsPropertyPrisSpart(this.sparingObject ,0); 
  }



  


}
