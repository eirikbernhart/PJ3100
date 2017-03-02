import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseAuth } from 'angularfire2';

import { SparingObject } from '../pages/sparing-object/sparing-object';





@Injectable()
export class AuthService implements OnInit {

  public fireAuth: any;
  public userDataVar: any;
  public userId: any;
  public databaseRef = firebase.database().ref('/userData');
  public currentUser;
  
  constructor(
    public http: Http,
    public af: AngularFire,
    public fb: FirebaseAuth
    ) { 

      console.log("AuthServ constructor ran");

      this.fireAuth = firebase.auth();
      this.userDataVar = firebase.database().ref('/userData');
  }

  ngOnInit(): void {
	  
  }

  doLogin(email: string, password: string): any {

    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string): any {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
        this.userDataVar.child(newUser.uid).set({email: email});
      })
  }

  resetPassword(email: string, password: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  doLogout(): any {
    this.currentUser = null;
    return this.fireAuth.signOut();
  }

  getCurrentUser() {
    return this.fireAuth.uid;
  }



}
