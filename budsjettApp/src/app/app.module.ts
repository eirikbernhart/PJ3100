import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Forside } from '../pages/forside/forside';
import { Tabs } from '../pages/tabs/tabs';
import { Sparing } from '../pages/sparing/sparing';
import { NySparing } from '../pages/ny-sparing/ny-sparing';

@NgModule({
  declarations: [
    MyApp,
    Forside,
    Tabs,
    Sparing,
    NySparing
  ],
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Forside,
    Sparing,
    NySparing,
    Tabs,
  ],
  providers: []
})
export class AppModule {}
