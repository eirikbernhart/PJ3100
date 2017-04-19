import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import Rx from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable, FirebaseAuth } from 'angularfire2';

import { AuthService } from './auth-service';
import { TimelineService } from './timeline-service';

import * as moment from 'moment';
import 'moment-timezone';

@Injectable()
export class CalculationService implements OnInit{


  public timelineServ: TimelineService;

  public currentUser;

  //TotalData for each category based on day/week/month:
  public sumAll: number = 0;
  public sumAllFoodAndDrink: number = 0;
  public sumAllClothes: number = 0;
  public sumAllOther: number = 0;

  constructor(
    public http: Http,
    public af: AngularFire,
    public authServ: AuthService
    ) {
      
    }

    
 ngOnInit(): void {    

 }

  //This method can get the total amount of expenses, based on:
  //"Today", "current week" and "current month".
  sumTotalAll(date: string, filterBy: string) {
    this.currentUser = firebase.auth().currentUser;

    let orderType: string;

    if(filterBy == "day") {
      orderType = "date"
      date = date;

    } else if(filterBy == "week") {
      orderType ="dateWeek"

      let dateWeek = moment().tz("Europe/Berlin").week();
      date = dateWeek.toString();
    
    } else if(filterBy == "month") {
      orderType ="dateMonth"
      date = date.substring(0, 2);
    }

    let queryObservable = this.af.database.list('/userData/' + this.currentUser.uid + '/expenseFlatened', {
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
