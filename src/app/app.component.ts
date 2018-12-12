import { Angular2TokenService } from 'angular2-token';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage
  currentUser: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              private _tokenService: Angular2TokenService,
              private alertCtrl: AlertController) {
    this._tokenService.init({
      apiBase: 'https://gk-cooper-api.herokuapp.com/api/v1'
    })

    this.initializeApp();
    this.pages = [
      { title: 'Home', component: HomePage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  loginPopUp() {
    let confirm = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'email',
          placeholder: 'email'
        },
        {
          name: 'password',
          placeholder: 'password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
          handler: data => {
            this.login(data);
          }
        }
      ]
    });
    confirm.present()
  }

  login(credentials) {
    this._tokenService
      .signIn(credentials)
        .subscribe(
          res => (this.currentUser = res.json().data),
          err => console.error('error')
        );
  }

  logout() {
    this._tokenService
      .signOut()
        .subscribe(
          res => console.log(res),
          err => console.log('error'));
      this.currentUser = undefined
  }
}
