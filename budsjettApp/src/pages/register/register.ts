import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { FirebaseProvider } from '../../providers/firebase-provider';
//import { HomePage } from '../home/home';
import { Tabs } from '../tabs/tabs';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  public registerForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  fullnameChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

  constructor(
    public navCtrl: NavController, 
    public fbp: FirebaseProvider, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder, 
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController
    ) {

    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.registerForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  doRegister(){
    this.submitAttempt = true;

    if (!this.registerForm.valid){
      console.log(this.registerForm.value);
    } else {
      this.fbp.register(this.registerForm.value.email, this.registerForm.value.password).then( fbp => {
        this.navCtrl.setRoot(Tabs);
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

}