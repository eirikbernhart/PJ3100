import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFire } from 'angularfire2'

<<<<<<< HEAD
import { FirebaseProvider } from '../../providers/firebase-provider';



=======
/*
  Generated class for the TidslinjeForKategori page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
>>>>>>> e0da23be4f47a2cb94756eacff29a820ed0776d8
@Component({
  selector: 'page-tidslinje-for-kategori',
  templateUrl: 'tidslinje-for-kategori.html'
})
export class TidslinjeForKategori {
<<<<<<< HEAD

  private category: any;
  private fb_categoryPath: string;
  private headerTitle: string;
  private uniqueDates = [];
  private items: FirebaseListObservable<any>;

  constructor(public navParams: NavParams, private af: AngularFire, private fpb: FirebaseProvider) {

=======
  category: any;
  headerTitle: string;
  listings: FirebaseListObservable<any>;

  constructor(public navParams: NavParams, private af: AngularFire) {
>>>>>>> e0da23be4f47a2cb94756eacff29a820ed0776d8
    this.category = navParams.data;
    var headerTitle_ = this.category.title.replace( /([A-Z])/g, " $1" );
    this.headerTitle = headerTitle_.charAt(0).toUpperCase() + headerTitle_.slice(1);

<<<<<<< HEAD

    this.fb_categoryPath = 
      '/' + this.category.incomeOrExpense + 
      '/' + this.category.title;

     this.pushUniqueDates(this.uniqueDates);

     this.items = af.database.list(this.fb_categoryPath);

  }

  /* Pushes all date values in each object under the category, 
  ** and makes the array containing only unique values (dates), then sorts it out.
  */
  pushUniqueDates(arr: Array<any>){
    let flags:any = [];
    let count = 0;

    this.af.database.list(this.fb_categoryPath, { preserveSnapshot: true })
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          count++;

          let date: string = snapshot.val().date;
          if(flags[date]) return;
          flags[date] = true;
          arr.push(date);
        });
        arr.sort();
      });
  }

  ionViewDidLoad() {
    console.log(
      '/' + this.category.incomeOrExpense + 
      '/' + this.category.title
    );
  }

}

=======
    this.listings = af.database.list(
      '/' + this.category.incomeOrExpense + 
      '/' + this.category.title);
  }

  ionViewDidLoad() {
    console.log('/' + this.category.incomeOrExpense + 
      '/' + this.category.title);
  }

}
>>>>>>> e0da23be4f47a2cb94756eacff29a820ed0776d8
