import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import firebase from 'firebase';
import { AuthService } from '../../providers/auth-service';
import { Instillinger } from '../instillinger/instillinger';
import { LoginPage } from '../login/login';


import Rx from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';
import 'moment-timezone';


import { CalculationService } from '../../providers/calculation-service';

import 'chart.js/src/chart.js';
declare var Chart;


@Component({
  selector: 'page-forside',
  templateUrl: 'forside.html',
})

export class Forside {

  

  
  public dateVarUpd = moment().tz("Europe/Berlin").format('MM/DD/YYYY');

  @ViewChild('canvas') doughCanvas;
  public doughChart: any;
 

  public instillinger = Instillinger;

  public expensesToShow: any;

  public sumTotalDay;
  public sumTotalWeek;
  public sumTotalMonth;

  filtrerTest: string = "month";

  public currentBalance: any;
  public foodTotalTest = 0;
  foodTotal;
  clothTotal;
  annetTotal;
  rent;

  public forkJoinedVal;



  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    public app: App,
    public calcServ: CalculationService,
  ) {

    console.log("Forside constructor ran!");

    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        app.getRootNav().setRoot(LoginPage);

      }
    });

    
    setTimeout(x => {
      this.updateDiagram("month");
      this.filtrerTest = 'month';
    }, 1000);

  }


  logout() {
    this.authService.doLogout();
  }

  ionViewDidEnter() {

    Chart.defaults.global.legend.display = false;
      

  }

  ngOnInit() {
    

      this.renderChart();

    
  }


  renderChart() {
    this.doughChart = new Chart(this.doughCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ["Mat og drikke", "Bolig", "Klær og utsyr", "Annet"],
        datasets: [{
          data: [(this.calcServ.sumAllFoodAndDrink), 8600, this.calcServ.sumAllClothes, this.calcServ.sumAllOther], //Kategori data skal inn i dette arrayet!
          backgroundColor: [
            'rgba(40, 126, 212, 0.5)',
            'rgba(192,183,244, 0.7)',
            'rgba(255,165,0, 0.4)',
            'rgba(0,153,135, 0.4)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(137, 40, 212, 0.5)',
            'rgba(40, 126, 212, 0.5)',
            'rgba(212, 126, 40, 0.5)',
            'rgba(40, 212, 183, 0.5)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1,
          options: {
            onClick: false,
            legend: {
              display: false
            },
          }
        }]
      },
    })
  }

  updateDiagram(value) {

   
    let dataFoodAndDrink;
    let dataRent;
    let dataClothes;
    let dataAnnet;
    let disponibeltDivider;

    this.currentBalance;

    if (value == "day") {

      this.calcServ.sumTotalAll(this.dateVarUpd, "day");
      dataRent = (8000 / 31);
      disponibeltDivider = 31;

    } else if (value == "week") {

      this.calcServ.sumTotalAll(this.dateVarUpd, "week");
      dataRent = (8000 / 4);
      disponibeltDivider = 4;

    } else if (value == "month") {

      this.calcServ.sumTotalAll(this.dateVarUpd, "month");
      dataRent = (8000);
      disponibeltDivider = 1;
    }
    
    setTimeout(x => {

          dataFoodAndDrink = (this.calcServ.sumAllFoodAndDrink);
          dataClothes = (this.calcServ.sumAllClothes);
          dataAnnet = (this.calcServ.sumAllOther);

          let total = (dataFoodAndDrink + dataRent + dataClothes + dataAnnet);
          this.expensesToShow = total;

          let income = 0;
          let incomeObservable = this.calcServ.af.database.list('/userData/' + this.calcServ.currentUser.uid + '/income');
          
          incomeObservable.map(list => {
            for (var key in list){
              income += list[key].amount;
            }
            console.log('incoooome ' + income);
          }).subscribe(x => {
            this.currentBalance = income / disponibeltDivider;

            this.currentBalance = Math.round(this.currentBalance);
            this.sumTotalMonth = Math.round(this.currentBalance/total); // Verdi for progressbar
            this.sumTotalWeek = Math.round(this.currentBalance/total);
            this.sumTotalDay = Math.round(this.currentBalance/total);
            this.expensesToShow = Math.round(this.expensesToShow);
          });

      }, 500);


    setTimeout(x => {

      console.log("Er dataen riktig?: " + dataFoodAndDrink);
      console.log("Er dataen riktig?: " + dataRent);
      console.log("Er dataen riktig?: " + dataClothes);
      console.log("Er dataen riktig?: " + dataAnnet);

      this.doughChart.data.datasets[0].data[0] = dataFoodAndDrink;
      this.doughChart.data.datasets[0].data[1] = dataRent;
      this.doughChart.data.datasets[0].data[2] = dataClothes;
      this.doughChart.data.datasets[0].data[3] = dataAnnet;
      this.doughChart.update();

    }, 1000);

  }

}