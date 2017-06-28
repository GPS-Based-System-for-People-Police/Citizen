import { RegisterPage } from '../pages/register/register';
import { Transfer } from '@ionic-native/transfer';
import { Globals } from './../providers/globals';
import { RootPagePage } from './../pages/root-page/root-page';
import { Authenticator } from './../providers/authenticator';
import { NotificationReader } from './../providers/notification-reader';
import { PostnewsPage } from './../pages/postnews/postnews';
import { NotificationPage } from './../pages/notification/notification';
import { LoginPage } from './../pages/login/login';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, NavController } from 'ionic-angular';
import { MyApp } from './app.component';
import { MapPage } from '../pages/map/map';
import { Location } from './../providers/location';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { IonicStorageModule } from '@ionic/storage';

/** RXJS Extensions */

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    LoginPage,
    NotificationPage,
    PostnewsPage,
    RootPagePage,
    RegisterPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'}),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    LoginPage,
    NotificationPage,
    PostnewsPage,
    RootPagePage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    GoogleMaps,
    NotificationReader,
    Authenticator,
    Location,
    Globals,
    Transfer
  ]
})
export class AppModule {}
