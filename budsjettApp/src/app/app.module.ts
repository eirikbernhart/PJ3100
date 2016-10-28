import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { TidsLinje } from '../pages/tidslinje/tidslinje-page';

@NgModule({
  declarations: [
    MyApp,
    TidsLinje
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TidsLinje
  ],
  providers: []
})
export class AppModule {}
