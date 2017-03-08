import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable'
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as moment from 'moment';
import { FirebaseProvider } from './firebase-provider';
import * as fb from 'firebase';
export interface DataSnapshot extends fb.database.DataSnapshot{}
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
  //TotalData for each category based on day/week/month:
  public sumAll: number = 0;
  public sumAllFoodAndDrink: number = 0;
  public sumAllClothes: number = 0;
  public sumAllOther: number = 0;
  
  foodAmountToday;
  foodAmountWeek;
  foodAmountMonth;

  constructor(public http: Http, private fbp: FirebaseProvider) {
    this.fbp.af.auth.subscribe(user => {
      if (user)
        this.currentUser = user;
      this.initAmountsOf("matOgDrikke", day => {
        this.foodAmountToday = day;
      }, week => {
        this.foodAmountWeek = week;
      }, month => {
        this.foodAmountMonth = month;
      });
    });
  }

  public clogData = new Object;
  clogInfo(){
    let amo;
    this.getTotalAmountOf("matOgDrikke", '07.03.2017', amount => {
      amo = amount;
    });
    setTimeout(() => {
      for (let key in this.clogData){
        console.log(this.clogData[key]);
      }
      console.log("getTotAmOf: " + amo);
      console.log("foodAmounts:" + ' ' + this.foodAmountToday + " " + this.foodAmountWeek + " " + this.foodAmountMonth);
    }, 10000)
  }
  
  initAmountsOf(category: string, day, week, month){
    this.day = new Date().getDate();
    this.month = new Date().getMonth() +1;
    this.year = new Date().getFullYear();
    this.weekDay = new Date().getDay() +1;
    let daystr = (this.day < 10) ? "0" + this.day : this.day;
    let monthstr = (this.month < 10) ? "0" + this.month : this.month;

    this.getTotalAmountOf(category, daystr + "." + monthstr + "." + this.year, amount => {
      day(amount);
    });

    let monday = this.day - this.weekDay;
    let date;
    let day2;
    let found1: boolean;
    let weekAmount = 0;
    for (let i = 0; i <= this.weekDay; i++){
      day2 = (monday + i < 10) ? '0' + (monday + i) : monday + i;
      date = day2 + "." + monthstr + "." + this.year
      this.clogData['date1'] = "date 1: " + date;
      console.log(date);
      this.getTotalAmountOf(category, date, amount => {
        weekAmount += amount;
        if (i === this.weekDay){
          week(weekAmount);
          found1 = true;
        }
      });
      if (found1) break;
    }

    let day3;
    let monthAmount = 0;
    let found2 = false;
    for (let i = 1; i <= this.day; i++){
      day3 = (i < 10) ? '0' + i : i;
      date = day3 + "." + monthstr + "." + this.year;
      this.clogData['date2'] = "date 2 " + date;
      console.log(date);
      this.getTotalAmountOf(category, date, amount => {
        monthAmount += amount;
        if (i === this.day){
          month(monthAmount);
          found2 = true;
        }
      });
      if (found2) break;
    }

    return new Promise(function(resolve, reject){
      if (found1 && found2) {
        resolve(found1 && found2);
        
      }
    });
  }
  
  getTotalAmountOf(category: string, date: string, callback) {
    let expenseRef = this.fbp.af.database.list('/userData/' + this.currentUser.uid + '/expense/' + category).$ref.orderByChild('date').equalTo(date);
    
  
    var amount = 0;

    expenseRef.once("value", snapshots => {
      let isAmountReady;
      let count = 0;
      let length = snapshots.numChildren();
      snapshots.forEach((item: fb.database.DataSnapshot) => {
        count++;
        amount += item.val().amount;
        isAmountReady = (count === length);
        console.log('isAmountReady: ' + isAmountReady);
        if (isAmountReady)
          callback(amount);

        return false
        
      });
    });
  }


  //..........................................................................................................
  //This method can get the total amount of expenses, based on:
  //"Today", "current week" and "current month".
  sumTotalAll(date: string, filterBy: string) {
    this.fbp.af.auth.subscribe(user => {
      if (user)
        this.currentUser = user.uid;
    });


    let orderType: string;

    if(filterBy == "day") {
      orderType = "date"
      date = date;

    } else if(filterBy == "week") {
      orderType ="dateWeek"

      moment.locale();
      let dateWeek = moment().isoWeek();
      console.log("Vi er i uke: " + dateWeek);
      date = dateWeek.toString();
    
    } else if(filterBy == "month") {
      orderType ="dateMonth"
      date = date.substring(0, 2);
    }

    let queryObservable = this.fbp.af.database.list('/userData/' + this.currentUser.uid + '/expenseFlatened', {
      query: {
        orderByChild: orderType,
        equalTo: date
      }
    })
     
      //KEEP...
      queryObservable
        .map(x => {

          this.sumAll = 0;
          this.sumAllFoodAndDrink = 0;
          this.sumAllClothes = 0;
          this.sumAllOther = 0;

          x.forEach(i => {
            this.sumAll += i.amount * (-1);

            console.log("Kategori på element: " + i.category)

            if(i.category == "foodAndDrink") {
              this.sumAllFoodAndDrink += i.amount * (-1);
            } else if(i.category == "clothes") {
              this.sumAllClothes += i.amount * (-1);
            } else if(i.category == "other") {
              this.sumAllOther += i.amount * (-1);
            }

          })
        }).subscribe(sum => {
          console.log("Total innen kategorien matOgDrikke: " + this.sumAllFoodAndDrink);
          console.log("Total innen kategorien klær: " + this.sumAllClothes);
          console.log("Total innen kategorien annet: " + this.sumAllOther);
          console.log("Total sum for alt: " + this.sumAll);
        });
  }
}
