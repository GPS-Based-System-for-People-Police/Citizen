import { Globals } from './globals';
import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { TransferObject, Transfer } from '@ionic-native/transfer';



export interface PoliceLocationInfo {
  id: string;
  latitude: string;
  langitude: string
}

@Injectable()
export class Location {

  private serverURL: string;

  constructor(public http: Http, private globals: Globals, private transfer: Transfer) {
    this.serverURL = this.globals.WEBSITE_URL;
  }

  setLoc(userName: string, langt: number, lat: number) {
    this.http.post(this.serverURL + "test.php", null).subscribe(res => {
      console.log("Session" + res.text());
    });
    let data = new URLSearchParams();
    data.append('u', userName);
    data.append('lat', lat.toString());
    data.append('langt', langt.toString());
    return this.http.post(this.serverURL + "setLocation.php", data).map(res => res.json()).toPromise();
  }

  getLoc() {
    let data = new URLSearchParams();
    data.append('u', this.globals.userName);
    return this.http.post(this.serverURL + "getLocation.php", data).map(res => res.json()).toPromise();
  }

  sendNotification(message: string, image: string) {

    if (image) {

      let data = new URLSearchParams();
      data.append('u', this.globals.userName);
      data.append('image',image);
      this.http.post(this.serverURL + "sendNotificationImage.php", data).map(res => res.json()).toPromise().then(res=>{
        alert(JSON.stringify(res));
      });

      // const fileTransfer: TransferObject = this.transfer.create();

      // let options: FileUploadOptions = {
      //   fileKey: 'nimage',
      //   fileName: this.globals.userName,
      //   headers: {}
      // }
      // fileTransfer.upload(image, this.globals.WEBSITE_URL + 'sendNotificationImage.php', options)
      //   .then((data) => {
      //     alert(JSON.stringify(data));
      //   }, (err) => {
      //     alert("error" + JSON.stringify(err));
      //   });
    }
    if (message) {
      let data = new URLSearchParams();
      data.append('u', this.globals.userName);
      data.append('m', message);
      this.http.post(this.serverURL + "sendNotificationMessage.php", data).map(res => res.json()).toPromise().then(res => {
        alert('Message Successfully Sent');
      }).catch(err => {
        alert("Something went wrong")
      });
    }
    let locationData = new URLSearchParams();
    locationData.append('u', this.globals.userName);
    locationData.append('lat', this.globals.position.coords.latitude.toString());
    locationData.append('langt', this.globals.position.coords.longitude.toString());
    return this.http.post(this.serverURL + "sendNotificationLocation.php", locationData).map(res => res.json()).toPromise();
  }
}
