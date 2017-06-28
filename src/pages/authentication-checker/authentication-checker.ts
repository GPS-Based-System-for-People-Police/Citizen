import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the AuthenticationChecker page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-authentication-checker',
  templateUrl: 'authentication-checker.html'
})
export class AuthenticationCheckerPage {

  rootPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthenticationCheckerPage');
  }

}
