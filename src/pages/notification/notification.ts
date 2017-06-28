import { RootPagePage } from './../root-page/root-page';
import { Globals } from './../../providers/globals';
import { PostnewsPage } from './../postnews/postnews';
import { Notification, NotificationReader } from './../../providers/notification-reader';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})
export class NotificationPage {

  notifications: Notification[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private reader: NotificationReader,
    private globals: Globals
  ) {
  }

  ionViewDidLoad() {
    this.notifications = [];
  }

  notificationSelected(notification: Notification) {}

  uploadNotification() {
    this.navCtrl.push(PostnewsPage);
    console.log("Uploading Notification");
  }

}
