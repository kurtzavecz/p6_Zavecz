import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { AuthService } from '../services/auth';
import { SingInPage } from '../pages/sing-in/sing-in';
import { RegisterPage } from '../pages/register/register';
import { DisplayPage } from '../pages/display/display';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = DisplayPage;
  signInPage = SingInPage;
  registerPage = RegisterPage;
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController, private authService: AuthService) {

    firebase.initializeApp({
      apiKey: "AIzaSyAAxPVu3Psxf0DJP5nqwz71s4EZootQuSk",
      authDomain: "p5zavecz.firebaseapp.com"
    })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
        this.rootPage = SingInPage;
      }
    });

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(SingInPage);
  }
}
