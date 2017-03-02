import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from './auth-service';
import { AngularFire, FirebaseAuth } from 'angularfire2';

import { SparingObject } from '../pages/sparing-object/sparing-object';



@Injectable()


/*************This providers logic is in AuthService, which is not a good idea...***************/
export class WishlistService {


  //Wishlist-specific
  public userDataVar: any;
  public databaseRef  = firebase.database().ref('/userData');;
  public currentUser;

  sparingObjects: SparingObject[];
  sparingObject: SparingObject;
  extName: string;
  extPris: number;
  public wishListEntry;

 
  constructor(
    public http: Http, 
    public auth:  AuthService,
    public af: AngularFire) {   


    this.userDataVar = firebase.database().ref('/userData');
      
      
  }

  ngOnInit(): void {
	  
  }

   nySparingFirebase(id: number, name: string, pris: number, dato: string) {
    this.sparingObject = new SparingObject(id, name, pris, dato);
  }

  addWishList(sparingObj) :any {
    this.currentUser = firebase.auth().currentUser;
      if(this.currentUser) {
        this.databaseRef.child(this.currentUser.uid + "/sparinger/").push(sparingObj); 
      } 
  }

  getDataBasedOnCurrentUser() {
    this.currentUser = firebase.auth().currentUser;
    if(this.currentUser) {
      return this.af.database.list('/userData/' + this.currentUser.uid + "/sparinger/"); 
    }
  }

  getUserUID() {
    this.currentUser = firebase.auth().currentUser;
    if(this.currentUser) {
      var ref = firebase.database().ref("/userData/"+this.currentUser.uid);
      ref.once("value")
        .then(function(snapshot) {
          var key = snapshot.key;
          var childKey = snapshot.child('pris');
          console.log(key);
        })
    }
  }

  deleteBasedOnCurrentUser(sparingObj) {
    //console.log(sparingObj.$key);
    this.currentUser = firebase.auth().currentUser;
    if(this.currentUser) {
        firebase.database().ref("/userData/"+this.currentUser.uid + "/sparinger/" +sparingObj.$key).remove();
      } 
  }

  setSparingsPropertyPris(sparingObj, pris) {
      this.currentUser = firebase.auth().currentUser;
      firebase.database().ref("/userData/"+this.currentUser.uid + "/sparinger/" +sparingObj.$key).update({pris: pris});
  }



}
