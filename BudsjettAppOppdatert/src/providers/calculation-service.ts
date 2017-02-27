import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import Rx from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable, FirebaseAuth } from 'angularfire2';

import { AuthService } from './auth-service';
import { TimelineService } from './timeline-service';

@Injectable()
export class CalculationService implements OnInit{


  public timelineServ: TimelineService;

  public currentUser;

  public data;
  public week;

  

  //TotalData for each category based on day/week/month:

  //Data-total: day
  public sumFoodAndDrinkToday;
  public sumClothesToday;
  public sumAnnetToday;

  //Data-total: week
  public sumFoodAndDrinkDatedCurrentWeek;

  //Data-total: month
  public sumAnnet = 0;
  public sumFoodAndDrink = 0;
  public sumClothes = 0;
  public sumIncome = 0;

  public localArray;
  public bsVar = 0;
  public afObject;

  constructor(
    public http: Http,
    public af: AngularFire,
    public authServ: AuthService
    ) {
      console.log("CalculationService-constructor ran: " + this.sumFoodAndDrink);
    }

    

    ngOnInit(): void {
    }

  //Iterere gjennom hovedkategoriene og hente prisen fra verdiene i hver kategori 
  totalSumUtgifter(dato: Date){
   
  }

  getCurrentWeek(input) {

  }

  //Get the current week of this year. Not really useful for us atm...
  getWeekOfTheYear() {
    let now: any = new Date();
    let onejan: any = new Date(now.getFullYear(), 0, 1);
    this.week = Math.ceil( (((now - onejan) / 86400000) + onejan.getDay() + 1) / 7 );
    console.log("This week is: " + this.week);
  }


  testSnapShot() {
    this.currentUser = firebase.auth().currentUser; 
    let queryObservable = this.af.database.list('/userData/' 
    + this.currentUser.uid + '/expense', { preserveSnapshot: true })
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => { 
          console.log(snapshot.val())
        })
     })
  }

  iterateThroughChildren() {

  }


  totalFoodAndDrinkToday(date: string) {
    this.currentUser = firebase.auth().currentUser; 
    let queryObservable = this.af.database.list('/userData/' 
    + this.currentUser.uid + '/expense/matOgDrikke', {
      query: {
        orderByChild: 'date',
        equalTo: date
      }
    });

    return queryObservable
      .map(x => {
        this.sumFoodAndDrinkToday = 0;
        x.forEach(i => {
          this.sumFoodAndDrinkToday = this.sumFoodAndDrinkToday + i.amount * (-1);
        })
      })
  }

  totalClothesToday(date: string) {
    this.currentUser = firebase.auth().currentUser; 
    let queryObservable = this.af.database.list('/userData/' 
    + this.currentUser.uid + '/expense/klærOgUtstyr', {
      query: {
        orderByChild: 'date',
        equalTo: date
      }
    });

     return queryObservable
      .map(x => {
        this.sumClothesToday = 0;
        x.forEach(i => {
          this.sumClothesToday = this.sumClothesToday + i.amount * (-1);
        })
      })
  }

  totalAnnetToday(date: string) {
    this.currentUser = firebase.auth().currentUser; 
    let queryObservable = this.af.database.list('/userData/' 
    + this.currentUser.uid + '/expense/annet', {
      query: {
        orderByChild: 'date',
        equalTo: date
      }
    });

     return queryObservable
      .map(x => {
        this.sumAnnetToday = 0;
        x.forEach(i => {
          this.sumAnnetToday = this.sumAnnetToday + i.amount * (-1);
        })
      })
  }

   orderAmountByThisWeek(date: string) {

    let currentDay;
    

    this.currentUser = firebase.auth().currentUser; 
    let queryObservable = this.af.database.list('/userData/' 
    + this.currentUser.uid + '/expense/matOgDrikke', {
      query: {
        orderByChild: 'date',
        equalTo: date
      }
    });

    return queryObservable
      .map(x => {
        this.sumFoodAndDrinkDatedCurrentWeek = 0;
        x.forEach(i => {

          console.log("Vi er på dato: " + i.date)
          
            currentDay = parseInt(i.date.substring(2,4));
            if(currentDay < 8) {
              this.week = 1;
              //console.log("Utgifter første uke: " + i.amount)
              this.sumFoodAndDrinkDatedCurrentWeek = this.sumFoodAndDrinkDatedCurrentWeek + i.amount * (-1);
            } else if (currentDay > 7 && currentDay < 15) {
              this.week = 2;
              //console.log("Utgifter andre uke: " + i.amount)
              this.sumFoodAndDrinkDatedCurrentWeek = this.sumFoodAndDrinkDatedCurrentWeek + i.amount * (-1)
            } else if (currentDay > 14 && currentDay < 22) {
              this.week = 3;
              //console.log("Utgifter tredje uke: " + i.amount)
              this.sumFoodAndDrinkDatedCurrentWeek = this.sumFoodAndDrinkDatedCurrentWeek + i.amount * (-1)
            } else {
              this.week = 4;
              //console.log("Utgifter fjerde uke: " + i.amount)
              this.sumFoodAndDrinkDatedCurrentWeek = this.sumFoodAndDrinkDatedCurrentWeek + i.amount * (-1)
            }
            //console.log(this.week)
            console.log("Utgifter denne uken: " + this.sumFoodAndDrinkDatedCurrentWeek);
            

        })
      })
      
   }
  

  

  totalFoodAndDrink() {
    
    this.currentUser = firebase.auth().currentUser; 
    let entriesFromFoodAndDrink$ = this.af.database.list('/userData/' 
    + this.currentUser.uid + '/expense/matOgDrikke');

    return entriesFromFoodAndDrink$
    .map(x => { 
      this.sumFoodAndDrink = 0;
        x.forEach(i => { 
          this.sumFoodAndDrink = this.sumFoodAndDrink + i.amount * (-1);
        })
      })
  }

  totalClothes() {
    
    this.currentUser = firebase.auth().currentUser; 
    let entriesFromFoodAndDrink$ = this.af.database.list('/userData/' 
    + this.currentUser.uid + '/expense/klærOgUtstyr');

    return entriesFromFoodAndDrink$
    .map(x => { 
      this.sumClothes = 0;
        x.forEach(i => { 
          this.sumClothes = this.sumClothes + i.amount * (-1);
        })
      })
  }

  totalAnnet() {
    
    this.currentUser = firebase.auth().currentUser; 
    let entriesFromAnnet$ = this.af.database.list('/userData/' 
    + this.currentUser.uid + '/expense/annet');

    return entriesFromAnnet$
    .map(x => { 
      this.sumAnnet = 0;
        x.forEach(i => { 
          this.sumAnnet = this.sumAnnet + i.amount * (-1);
        })
      })
  }



}
