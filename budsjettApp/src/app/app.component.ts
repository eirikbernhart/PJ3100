import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Tabs } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AngularFire } from 'angularfire2';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`,
})
export class MyApp {
  public rootPage;
  
  constructor(platform: Platform, af: AngularFire) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

       //"Cahces" that user is still logged in.
       af.auth.subscribe((auth) => {
        if(auth) {
           this.rootPage = Tabs;
        } else {
           this.rootPage = LoginPage;
        }
      })
    });
  }
}