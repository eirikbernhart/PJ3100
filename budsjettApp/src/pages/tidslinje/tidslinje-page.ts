import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TidslinjeForKategori } from '../tidslinje-for-kategori/tidslinje-for-kategori';

@Component({
  selector: 'tidslinje-page',
  templateUrl: 'tidslinje-page.html'
})
export class TidsLinje {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello TestPage Page');
  }

  goToCategory(categoryData){
    this.navCtrl.push(TidslinjeForKategori, categoryData)
  }
}
