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

  

  public dateFirst = moment.tz("Europe/Oslo");
  public dateVarUpd = moment().tz("Europe/Oslo").format('DD.MM.YYYY');
  public today = this.dateFirst.lang("nb").format('dddd Do MMMM');
  public currentWeek = this.dateFirst.week();
  public currentMonth = this.dateFirst.format('MMMM YYYY');

  @ViewChild('canvas') doughCanvas;
  public doughChart: any;
 

  public instillinger = Instillinger;

  public expensesToShow: any;

  public sumTotalDay;
  public sumTotalWeek;
  public sumTotalMonth;
  public dataSparing;
  public dataSparingShow;

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
    this.calcServ.sumSparing();
    this.filtrerTest = "month";
    this.updateDiagram(this.filtrerTest);
  }

  ngOnInit() {
    
      Chart.defaults.global.legend.display = false;
      this.renderChart();
     

    
  }


  renderChart() {
    this.doughChart = new Chart(this.doughCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ["Mat og drikke", "Bolig", "Klær og utsyr", "Annet", "Sparing"],
        datasets: [{
          data: [(this.calcServ.sumAllFoodAndDrink), 8000, this.calcServ.sumAllClothes, this.calcServ.sumAllOther, this.calcServ.sumSparingVar], //Kategori data skal inn i dette arrayet!
          backgroundColor: [
            'rgba(40, 126, 212, 0.5)',
            'rgba(192,183,244, 0.7)',
            'rgba(255,165,0, 0.4)',
            'rgba(200,78,99, 0.5)',
            'rgba(0,188,135, 0.5)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(137, 40, 212, 0.5)',
            'rgba(40, 126, 212, 0.5)',
            'rgba(212, 126, 40, 0.5)',
            'rgba(40, 212, 183, 0.5)',
            'rgba(0,188,135, 0.5)',
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
    let dataSparingLocal;
    

    setTimeout(x => {

    dataSparingLocal = (this.calcServ.sumSparingVar);
       console.log("eeeeeeeeeeeeeeeEr dataen riktig?: " + this.dataSparing);

    this.currentBalance;

    if (value == "day") {

      this.calcServ.sumTotalAll(this.dateVarUpd, "day");
      dataRent = (8000 / 31);
      //this.dataSparing = this.dataSparing / 31;
      dataSparingLocal = dataSparingLocal / 31;
      disponibeltDivider = 31;

      console.log("eeeeeeeeeeeeeeeEr dataen riktig? 2: " + dataSparingLocal);

    } else if (value == "week") {

      this.calcServ.sumTotalAll(this.dateVarUpd, "week");
      dataRent = (8000 / 4);
      //this.dataSparing = this.dataSparing / 4;
      dataSparingLocal = dataSparingLocal /4;
      disponibeltDivider = 4;

            console.log("eeeeeeeeeeeeeeeEr dataen riktig? 3: " + this.dataSparing);


    } else if (value == "month") {

      this.calcServ.sumTotalAll(this.dateVarUpd, "month");
      dataRent = (8000);
      //this.dataSparing = this.dataSparing;
      dataSparingLocal = dataSparingLocal;
      disponibeltDivider = 1;

            console.log("eeeeeeeeeeeeeeeEr dataen riktig? 4: " + this.dataSparing);

    }
      
    }, 300)

    

    
    
    

   
    
    setTimeout(x => {

          dataFoodAndDrink = (this.calcServ.sumAllFoodAndDrink);
          dataClothes = (this.calcServ.sumAllClothes);
          dataAnnet = (this.calcServ.sumAllOther);
          
          this.dataSparing = dataSparingLocal;

          if(this.dataSparing == undefined) {
            this.dataSparing = 0
          }
          
          let total = (dataFoodAndDrink + dataRent + dataClothes + dataAnnet + dataSparingLocal);
          this.expensesToShow = total;

          let income = 0;

         

          let incomeObservable = this.calcServ.af.database.list('/userData/' + this.calcServ.currentUser.uid + '/income');
          
          incomeObservable.map(list => {
            income = 0;
            for (var key in list){
              income += list[key].amount;
            }
          }).subscribe(x => {
            this.currentBalance = income / disponibeltDivider;

            this.currentBalance = Math.round(this.currentBalance);
            console.log(this.currentBalance, ' currentBalance');
            console.log(total, ' total');
            this.sumTotalMonth = Math.round(total/this.currentBalance * 100); // Verdi for progressbar
            console.log(this.sumTotalMonth);
            this.sumTotalWeek = Math.round(total/this.currentBalance * 100);
            this.sumTotalDay = Math.round(total/this.currentBalance * 100);
            this.expensesToShow = Math.round(this.expensesToShow);
            

          });
          if(income == 0) {
              this.filtrerTest ="none";
            } 

      }, 500);

      


    setTimeout(x => {

      console.log("Er dataen riktig?: " + dataFoodAndDrink);
      console.log("Er dataen riktig?: " + dataRent);
      console.log("Er dataen riktig?: " + dataClothes);
      console.log("Er dataen riktig?: " + dataAnnet);
      console.log("Er aaaaaaaaaaaaaaaaaaaaa riktig?: " + dataSparingLocal);


      this.doughChart.data.datasets[0].data[0] = dataFoodAndDrink;
      this.doughChart.data.datasets[0].data[1] = dataRent;
      this.doughChart.data.datasets[0].data[2] = dataClothes;
      this.doughChart.data.datasets[0].data[3] = dataAnnet;
      this.doughChart.data.datasets[0].data[4] = dataSparingLocal;
      this.doughChart.update();

    }, 1000);

  }

}