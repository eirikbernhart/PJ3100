import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Forside } from '../pages/forside/forside';
import { Tabs } from '../pages/tabs/tabs';
import { Sparing } from '../pages/sparing/sparing';
import { NySparing } from '../pages/ny-sparing/ny-sparing';
import { Instillinger } from '../pages/instillinger/instillinger';
import { TidsLinje } from '../pages/tidslinje/tidslinje-page';


@NgModule({
  declarations: [
    MyApp,
    Forside,
    Tabs,
    Sparing,
    NySparing,
    Instillinger,
    TidsLinje
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
    Instillinger,
    TidsLinje
  ],
  providers: []
})
export class AppModule {}
