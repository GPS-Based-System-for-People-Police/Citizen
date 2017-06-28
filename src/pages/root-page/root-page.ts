import { PostnewsPage } from '../postnews/postnews';
import { LoginPage } from './../login/login';
import { NotificationPage } from './../notification/notification';
import { MapPage } from './../map/map';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


/*
  Generated class for the RootPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-root-page',
  templateUrl: 'root-page.html'
})
export class RootPagePage {

  mapPage = MapPage;
  postNewsPage = PostnewsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RootPagePage');
  }
}
