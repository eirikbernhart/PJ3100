import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { FirebaseProvider } from '../../providers/firebase-provider';
import { RegisterPage } from '../register/register';
import { ResetpwdPage } from '../resetpwd/resetpwd';

import { Tabs } from '../tabs/tabs';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fbp: FirebaseProvider,  
    public formBuilder: FormBuilder) {

    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  resetPwd(){
    this.navCtrl.push(ResetpwdPage);
  }

  loginUser(){
    this.submitAttempt = true;

    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.fbp.doLogin(this.loginForm.value.email, this.loginForm.value.password);
      this.fbp.af.auth.subscribe((user) => {
        if(user) this.navCtrl.setRoot(Tabs);
      });
    }
  }

}