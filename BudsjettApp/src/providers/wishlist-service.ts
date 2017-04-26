import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from './auth-service';
import { AngularFire, FirebaseAuth } from 'angularfire2';

import { SparingObject } from '../pages/sparing-object/sparing-object';
import * as moment from 'moment';
import 'moment-timezone';




@Injectable()


export class WishlistService {


  public userDataVar: any;
  public databaseRef  = firebase.database().ref('/userData');
  public currentUser;

  sparingObjects: SparingObject[];
  public sparingObject: SparingObject;
  extName: string;
  extPris: number;
  public wishListEntry;

 
  constructor(
    public http: Http, 
    public auth:  AuthService,
    public af: AngularFire
    ) {   


    this.userDataVar = firebase.database().ref('/userData');
      
      
  }

  ngOnInit(): void {
	  
  }

   nySparingFirebase(id: number, name: string, prisTotal: number, spartPris: number, dato: string) {
    this.sparingObject = new SparingObject(id, name, prisTotal, spartPris, dato, "");
  }

  addWishList(sparingObj) :any {

  let dateVar = moment().tz("Europe/Berlin").format('DD.MM.YYYY');
  let timeVar = moment().tz("Europe/Berlin").format('HH:mm');

    this.currentUser = firebase.auth().currentUser;
      if(this.currentUser) {
       let refererence = this.databaseRef.child(this.currentUser.uid + "/sparinger/").push(sparingObj); 
        } 

  }

  getDataBasedOnCurrentUser() {
    this.currentUser = firebase.auth().currentUser;
    if(this.currentUser) {
      return this.af.database.list('/userData/' + this.currentUser.uid + "/sparinger/"); 
    }
  }

  getDataBasedOnCurrentUser2() {
    this.currentUser = firebase.auth().currentUser;
    if(this.currentUser) {
      return this.af.database.list('/userData/' + this.currentUser.uid + "/expenses/"); 
    }
  }

  getSparingerBasedOnCurrentUser() {
    this.currentUser = firebase.auth().currentUser;
    if(this.currentUser) {
      return this.af.database.list('/userData/' + this.currentUser.uid + "/expenses/"); 
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
    this.currentUser = firebase.auth().currentUser;
    if(this.currentUser) {

        firebase.database().ref("/userData/"+this.currentUser.uid + "/expenses/" +sparingObj.keyPointer).remove();
        firebase.database().ref("/userData/"+this.currentUser.uid + "/sparinger/" +sparingObj.$key).remove();
        
      } 
  }

  
  

  setSparingsPropertyPrisSpart(sparingObj, spartPris: any) {
      this.currentUser = firebase.auth().currentUser;
      spartPris = parseInt(spartPris);
      firebase.database().ref("/userData/"+this.currentUser.uid + "/sparinger/" +sparingObj.$key).once('value', item => {
        spartPris = parseInt(item.val().spartPris) + spartPris;
      }).then(x => {
        firebase.database().ref("/userData/"+this.currentUser.uid + "/sparinger/" +sparingObj.$key).update({spartPris: spartPris});
      });
  }

  setSparingsPropertyPrisSpart2(sparingObj, spartPris: any) {
      let dateVar = moment().tz("Europe/Berlin").format('DD.MM.YYYY');
      let timeVar = moment().tz("Europe/Berlin").format('HH:mm');


      this.currentUser = firebase.auth().currentUser;
      spartPris = parseInt(spartPris) * -1;
      let category: number; 
      let name: string; 
      let prisTotal: number;
      let spartPrisExtra: number;
      let dato: string;
      let fbRef;
      let dateCheck;
      
      firebase.database().ref("/userData/"+this.currentUser.uid + "/expenses/" +sparingObj.keyPointer).once('value', item => {
        dateCheck = item.val().date;
      });

      if(dateCheck == dateVar) {
          firebase.database().ref("/userData/"+this.currentUser.uid + "/expenses/" +sparingObj.keyPointer).once('value', item => {
            spartPris = parseInt(item.val().amount) + spartPris;
            category = item.val().category;
            name = item.val().title;
            spartPrisExtra = item.val().spartPris;
           
            
         }).then(x => {
            fbRef = firebase.database().ref("/userData/"+this.currentUser.uid + "/expenses/" +sparingObj.keyPointer).update({amount: spartPris});
         });
      } else {

      }
      
      
    
  }

   addSparingToFirebase(category, title, amountTotal, amountSpart, date, time, keyRef) {

    // Get week number based on year, month, day.
    let dateFunc = moment();
    let day = parseInt(date.substring(0, 2));
    let month = parseInt(date.substring(3, 5));
    let year = parseInt(date.substring(6, 10));
    let week = moment(date, "DD.MM-YYYY").week();

    let dbRef = this.af.database.list('/userData/' + this.currentUser.uid + '/expenses/')
      .push({
        title: title, 
        date: date, 
        dateWeek: week, 
        dateMonth: month, 
        time: time, 
        amount: amountTotal, 
        spartPris: amountSpart, 
        category: category
      });

      let pointerKey;
      
      firebase.database().ref("/userData/"+this.currentUser.uid + "/sparinger/" +keyRef).once('value', item => {
        pointerKey = item.val().keyPointer;
      }).then(x => {
        firebase.database().ref("/userData/"+this.currentUser.uid + "/sparinger/" +keyRef).update({keyPointer: dbRef.key});
      });
  }

}
