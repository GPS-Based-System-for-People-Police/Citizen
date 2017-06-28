import { empty } from 'rxjs/observable/empty';
import { ELEMENT_PROBE_PROVIDERS } from '@angular/platform-browser/testing/private_import_platform-browser';
import { LoginPage } from '../login/login';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Authenticator } from './../../providers/authenticator';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  userName: string = "";
  password: string = "";
  loginId: string = "";
  userEmail: string = "";
  userMobile: number = null;
  err: string="dfg";


  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public navParams: NavParams,
    private auth: Authenticator
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {
    let empty = /^[ ]*$/;
    let pss = /^[a-zA-Z0-9!@#$%^&*]{8}$/;
    let cmail = /[A-Z0-9\._%+-]+@[A-Z0-9_-]+\.[A-Z]{2,4}/igm;
    let phno = /^[0-9]{10}$/;
    let alert = this.alertCtrl.create({
      title: 'Oops',
      subTitle: '',
      buttons: ['OK']
    });

    if (this.userName.match(empty)) {
      alert.setSubTitle('please enter a user name...!');
      alert.present();
      return;
    }
    if (this.loginId.match(empty)) {
      alert.setSubTitle('please enter Login Id...!');
      alert.present();
      return;
    }
    if (!this.password.match(pss)) {
      alert.setSubTitle('password contain at least 8 character...!');
      alert.present();
      return;
    }
    if (!this.userEmail.match(cmail)) {
      alert.setSubTitle('please enter a valid email address...!');
      alert.present();
      return;
    }
    if (this.userMobile == null) {
      alert.setSubTitle('please enter a valid mobile number...!');
      alert.present();
      return;
    }
    if (!phno.test(this.userMobile.toString())) {
      alert.setSubTitle('please enter a valid mobile number...!');
      alert.present();
      return;
    }
    this.auth.register(this.userName, this.loginId, this.password, "c", this.userEmail, this.userMobile).then(res => {
      if (res.t == 's') {
        let alert = this.alertCtrl.create({
          title: 'Done',
          subTitle: 'You have successfully registered.\nLogin to continue.',
          buttons: ['OK'],
        });
        alert.present();
        this.navCtrl.setRoot(LoginPage);
      } else {
        console.log('Failed');
        let alert = this.alertCtrl.create({
          title: 'Failed',
          subTitle: res.r,
          buttons: ['OK']
        });
        alert.present();
        console.log(res.r);
      }
    }).catch(err => {
      console.log("SignUp Failed")
    });
  }
  login() {
    this.navCtrl.setRoot(LoginPage);
  }
}
