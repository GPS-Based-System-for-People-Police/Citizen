import { RootPagePage } from './../pages/root-page/root-page';
import { Authenticator } from './../providers/authenticator';
import { Storage } from '@ionic/storage';
import { NotificationPage } from './../pages/notification/notification';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MapPage } from '../pages/map/map';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private storage: Storage,
    private auth: Authenticator
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.storage.get('authentication').then((val) => {
          if(val == null) {
            this.nav.setRoot(LoginPage);
          } else {
            this.auth.login(val.userName, val.password,"c").then(res => {
              if(res.t == 's') {
                this.nav.setRoot(RootPagePage);
              } else {
                this.nav.setRoot(LoginPage);
              }
            });
          }
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
