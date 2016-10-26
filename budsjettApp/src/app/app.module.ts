import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Sparing } from '../pages/sparing/sparing';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Sparing
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Sparing
  ],
  providers: []
})
export class AppModule {}
