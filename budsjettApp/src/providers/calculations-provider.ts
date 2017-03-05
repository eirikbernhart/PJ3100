import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable'
import { AngularFire, FirebaseListObservable, FirebaseUrl } from 'angularfire2';
import { FirebaseProvider } from './firebase-provider';
import * as fb from 'firebase';
/*
  Generated class for the CalculationsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CalculationsProvider {

  currentUser;
  day;
  month;
  year;
  weekDay;
  foodAmountToday;
  foodAmountWeek;
  foodAmountMonth;
  
  constructor(public http: Http, private fbp: FirebaseProvider) {
    this.currentUser = fbp.auth.getAuth();
    this.day = new Date().getDate();
    this.month = new Date().getMonth() +1;
    this.year = new Date().getFullYear();
    this.weekDay = new Date().getDay();
    this.day = this.day < 10 ? "0" + this.day : this.day;
    this.month = this.month < 10 ? "0" + this.month : this.month;
    this.getTotalAmountOf("matOgDrikke", this.day + "." + this.month + "." + this.year, this.foodAmountToday);

    let monday = this.day - this.weekDay;
    for (let i = 0; i < this.weekDay; i++){
    }

    for (let i = 1; i < this.day; i++){
    }
  }
  //Returns a promise of the total sum for each object.amount under a category ----Returnerer ikke riktig verdi (bug)
  getTotalAmountOf(category: string, date: string, sum: number): any {
    /* w/ uid:
    let entries = this.fbp.fbp.database.list('/userData/' 
    + this.currentUser.uid + '/expense/'*/
    let expense = this.fbp.af.database.list('/userData/' + this.currentUser.uid + '/expense/' + category, {
      query: {
        orderByChild: 'date',
        equalTo: date
      }
    });

    expense.subscribe(snapshots => {
      snapshots.forEach(cat => {
        if (cat.$key == category) {
          console.log(cat.$key);
        }
      });
    });
  }


  //..........................................................................................................
  public data;
  public week;

  

  //TotalData for each category based on day/week/month:

  //Data-total: day
  public sumTotalToday;
  public sumTotalWeek;
  public sumTotalMonth;
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
  public fbpObject;

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

  iterateThroughChildren() {

  }


  totalFoodAndDrinkToday(date: string) {
    let queryObservable = this.fbp.af.database.list('/userData/' 
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
    let queryObservable = this.fbp.af.database.list('/userData/' 
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
    let queryObservable = this.fbp.af.database.list('/userData/' 
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
    
    let queryObservable = this.fbp.af.database.list('/userData/' 
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

    let entriesFromFoodAndDrink$ = this.fbp.af.database.list('/userData/' 
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
    
    let entriesFromFoodAndDrink$ = this.fbp.af.database.list('/userData/' 
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
    
    let entriesFromAnnet$ = this.fbp.af.database.list('/userData/' 
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
