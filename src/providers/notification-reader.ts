import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';

export interface Notification {
  id: number;
  type: number;
  heading: string;
}

@Injectable()
export class NotificationReader {


  private serverURL : string;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(public http: Http) {
    this.serverURL = "http://mabcoder.tk/insec/";
  }

  getNotifications() {
    let data = new URLSearchParams();
    return this.http.post(this.serverURL + "login.php", data).map(res => res.json()).toPromise();
  }

}
