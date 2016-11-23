import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Tabs } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`,
})
export class MyApp {

  public rootPage = Login;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      AngularFireModule.auth().onAuthStateChanged((user) => {
          if (!user) {
          this.rootPage = Login;
        }
      });

    });
  }
}
