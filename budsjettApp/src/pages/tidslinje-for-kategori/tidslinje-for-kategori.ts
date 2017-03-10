import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFire } from 'angularfire2'
import { FirebaseProvider } from '../../providers/firebase-provider';

/*
  Generated class for the TidslinjeForKategori page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tidslinje-for-kategori',
  templateUrl: 'tidslinje-for-kategori.html'
})
export class TidslinjeForKategori {
  private category: any;
  private fb_categoryPath: string;
  private headerTitle: string;
  private uniqueDates = [];
  private items: FirebaseListObservable<any>;

  constructor(public navParams: NavParams, private af: AngularFire, private fpb: FirebaseProvider) {
    this.category = navParams.data;
    var headerTitle_ = this.category.category.replace( /([A-Z])/g, " $1" );
    this.headerTitle = headerTitle_.charAt(0).toUpperCase() + headerTitle_.slice(1);

    this.fb_categoryPath = 
      'userData/' + this.af.auth.getAuth().uid +
      '/' + this.category.incomeOrExpense + 
      '/';
 
     this.pushUniqueDates(this.uniqueDates);

     this.items = af.database.list(this.fb_categoryPath, {
       query: {
         orderByChild: 'category',
         equalTo: this.category.category
       }
     });
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