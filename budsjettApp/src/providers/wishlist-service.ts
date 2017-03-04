import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FirebaseProvider } from './firebase-provider';
import { AngularFire, FirebaseAuth, FirebaseListObservable } from 'angularfire2';

import { SparingObject } from '../pages/sparing/sparing-object/sparing-object';



@Injectable()


/*************This providers logic is in AuthService, which is not a good idea...***************/
export class WishlistService {


  //Wishlist-specific
  public userDataVar: any;
  public currentUser;

  sparingObjects: SparingObject[];
  sparingObject: SparingObject;
  extName: string;
  extPris: number;
  public wishListEntry;

 
  constructor(
    public http: Http, 
    public fbp:  FirebaseProvider,
    public af: AngularFire) {   
      
      af.auth.subscribe((user)=>{
        if(user){
          this.currentUser = af.auth.getAuth().uid;
        }
      })
  }


   nySparingFirebase(id: number, name: string, pris: number, dato: string) {
    this.sparingObject = new SparingObject(id, name, pris, dato);
  }

  addWishList(sparingObj) :any {
    this.fbp.auth.subscribe((user)=>{
      if(user) {
        this.af.database.list("/userData/" + this.currentUser.uid + "/sparinger/").push(sparingObj); 
      } 
    });
      
  }

  getDataBasedOnCurrentUser() {
    this.fbp.auth.subscribe((user)=>{
      if(user) {
        return this.af.database.list("/userData/" + this.currentUser.uid + "/sparinger/");
      } 
    });
  }

  getUserUID() {
    this.fbp.auth.subscribe((user)=>{
      if(user) {
        let ref = this.af.database.object("/userData/" + this.currentUser.uid);
        return ref.$ref.once('value').then((val) => {return val});
      } 
    });
  }

  deleteBasedOnCurrentUser(sparingObj) {
    //console.log(sparingObj.$key);
    this.fbp.auth.subscribe((user)=>{
    if(user) {
        this.af.database.object("/userData/"+this.currentUser.uid + "/sparinger/" +sparingObj.$key).remove();
      } 
    });
  }

  setSparingsPropertyPris(sparingObj, pris) {
      this.af.database.object("/userData/"+this.currentUser.uid + "/sparinger/" +sparingObj.$key).set({pris: pris});
  }



}
