import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Forside } from '../pages/forside/forside';
import { HomePage } from '../pages/home/home';
import { Tabs } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    MyApp,
    Forside,
    HomePage,
    Tabs,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Forside,
    HomePage,
    Tabs
  ],
  providers: []
})
export class AppModule {}
