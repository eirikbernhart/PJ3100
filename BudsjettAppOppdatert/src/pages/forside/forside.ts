import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import firebase from 'firebase';
import { AuthService } from '../../providers/auth-service';
import { Instillinger } from '../instillinger/instillinger';
import { LoginPage } from '../login/login';


import Rx from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

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

  public ultSub;

  public dateVar = moment().tz("Europe/Berlin").format('DD/MM/YYYY');

  @ViewChild('canvas') doughCanvas;
  public doughChart: any;
  public nativeElementTest

  instillinger = Instillinger;
  
  
  public expensesToShow: any;
  public sumTotalExpensesMonth: any;
  public sumTotal;
  public sumTotalDay;
  public sumTotalWeek;
  public sumTotalMonth;

  filtrerTest: string = "month";

  public currentBalance: any = 16600;
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
    ){

      console.log("Forside constructor ran!");

      firebase.auth().onAuthStateChanged(function(user) {
          if(!user) {
            app.getRootNav().setRoot(LoginPage);
            
          }
        });
  }


  logout() {
    this.authService.doLogout();
  }

  ionViewDidLoad() {

    //this.setUpChart();
    //this.updateDiagramHack();

  }

  ionViewDidEnter() {
    
    //Har ikke fått til å filtrere på "nåværende" uke...
    /*this.calcServ.orderAmountByThisWeek(this.myDateVar.toLocaleDateString()).subscribe(x =>{
      console.log("Hve ere dene uken! " + this.calcServ.sumFoodAndDrinkDatedCurrentWeek)
    });*/

     
    
    this.updateDiagramHack();
    this.updateDiagram("month");
    
  }

  ionViewDidLeave() {
    
  }
  
 
  ngOnInit(){
    this.setUpChart();
    this.renderChart();
    setTimeout(x => { 
     this.updateDiagramHack();
    }, 1000);
    
   
  } 

 setUpChart() {

          let ultSub = this.calcServ.totalFoodAndDrink().subscribe(x => { 
            this.calcServ.totalClothes().subscribe(x => {
              this.calcServ.totalAnnet().subscribe(x => { 
                
               let initialExpsenses = this.calcServ.sumFoodAndDrink 
                + this.calcServ.sumClothes + this.calcServ.sumAnnet;
              

              //this.sumTotal = (this.sumTotalExpensesMonth / this.currentBalance * 100).toFixed(0);
              this.expensesToShow = (initialExpsenses / this.currentBalance * 100).toFixed(0);
                
              this.foodTotal = this.calcServ.sumFoodAndDrink;
              this.clothTotal = this.calcServ.sumClothes;
              this.annetTotal = this.calcServ.sumAnnet;

              console.log("sumFoodAndDrink inside subscribe: " + this.foodTotal);
              console.log("sumClothes inside subscribe: " + this.clothTotal);
              console.log("sumAnnet inside subscribe: " + this.annetTotal);
              
          }) //End s1
      }) //End s2
    }) //End s3
  }


 
  renderChart() {
          this.doughChart = new Chart(this.doughCanvas.nativeElement, {
                type: 'doughnut',
                data: {
                labels: [],
                datasets: [{
                data: [(this.foodTotalTest) * (-1), 8600, this.clothTotal, this.annetTotal], //Kategori data skal inn i dette arrayet!
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                options: {
                onClick: false,
                legend: {
                display: false
                 }
               }
              }]
            },
         })
  }


  //IonOnViewDidEnter does not render the chart, and is used to circumvent 
  //the issue of drawing multiple charts on top of eachother.
  //The side effect of this is that when page is "reloaded", the graph and
  //its data are empty. The user is likely to only log in and out, so user, wont
  //expereince this side-effect.
  updateDiagramHack() {
    this.doughChart.data.datasets[0].data[0] = this.foodTotal;
    this.doughChart.data.datasets[0].data[1] = 8000;
    this.doughChart.data.datasets[0].data[2] = this.clothTotal;
    this.doughChart.data.datasets[0].data[3] = this.annetTotal;
    this.doughChart.update();
    this.filtrerTest = "month";

    this.updateDiagram("month");

  }

  

  updateDiagram(value) {
    console.log("updateDiagram() ran successfully!" + value);

    let dataFoodAndDrink;
    let dataRent;
    let dataClothes;
    let dataAnnet;

    this.currentBalance = 16600;
        

    if(value == "day") {

     
      this.calcServ.totalFoodAndDrinkToday(this.dateVar).subscribe(x =>{
        this.calcServ.totalClothesToday(this.dateVar).subscribe(x =>{
          this.calcServ.totalAnnetToday(this.dateVar).subscribe(x =>{
            
            dataRent = (8000 / 31);
            dataFoodAndDrink = this.calcServ.sumFoodAndDrinkToday;
            dataClothes = this.calcServ.sumClothesToday;
            dataAnnet = this.calcServ.sumAnnetToday;
   
            this.sumTotalDay = dataFoodAndDrink + dataRent + dataClothes + dataAnnet
            this.expensesToShow = (this.sumTotalDay).toFixed(1);
            
            if(this.sumTotalDay > this.currentBalance/31) {
              this.sumTotalDay = 100;

            } else {
              this.sumTotalDay = ((this.sumTotalDay)/(this.currentBalance)*(100)*(31)).toFixed(0);          
            }
           })
        })
      })

      this.currentBalance = (this.currentBalance / 31).toFixed(0);

      } else if(value == "week") {
      dataFoodAndDrink = (this.foodTotal/3.4); //.toPrecision(3)
      dataRent = (8000 / 4); //.toPrecision(4)
      dataClothes = (this.clothTotal/2); //.toPrecision(2)
      dataAnnet = (this.annetTotal/11); //.toPrecision(2)

      this.expensesToShow = (dataFoodAndDrink + dataRent + dataClothes + dataAnnet).toFixed(0);

      this.currentBalance = (this.currentBalance / 4).toFixed(0);

    } else if(value == "month"){

      dataFoodAndDrink = (this.foodTotal); //.toPrecision(3)
      dataRent = (8000); //.toPrecision(4)
      dataClothes = (this.clothTotal); //.toPrecision(2)
      dataAnnet = (this.annetTotal); //.toPrecision(2)

      this.sumTotalMonth = (dataFoodAndDrink + dataRent + dataClothes + dataAnnet).toFixed(0);
      this.expensesToShow = this.sumTotalMonth;

      if(this.sumTotalMonth > this.currentBalance) {
        this.sumTotalMonth = 100;
      } else {
        this.sumTotalMonth = ((this.sumTotalMonth / this.currentBalance * 100).toFixed(0))
      }
    }

    this.doughChart.data.datasets[0].data[0] = dataFoodAndDrink;
    this.doughChart.data.datasets[0].data[1] = dataRent;
    this.doughChart.data.datasets[0].data[2] = dataClothes;
    this.doughChart.data.datasets[0].data[3] = dataAnnet;
    this.doughChart.update();

  }


}