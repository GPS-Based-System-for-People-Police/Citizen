import { Globals } from './globals';

import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';


@Injectable()
export class Authenticator {

  private serverURL : string;

  constructor(
    public http: Http,
    private globals: Globals
  ) {
    this.serverURL = this.globals.WEBSITE_URL;
  }

  login(userName: string, password: string, userType: string) {
    let data = new URLSearchParams();
    data.append('u', userName);
    data.append('p', password);
    data.append('t', userType);
    return this.http.post(this.serverURL + "login.php", data).map(res => res.json()).toPromise();
  }

  register(userName: string, loginId:string, password:string, type: string, email: string, phno: number) {
    let data = new URLSearchParams();
    data.append('un', userName);
    data.append('u',loginId);
    data.append('p', password);
    data.append('t', type);
    data.append('em', email);
    data.append('phno', phno.toString());
    return this.http.post(this.serverURL + "register.php", data).map(res => res.json()).toPromise();
  }

}
