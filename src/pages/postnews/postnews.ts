import { Http, URLSearchParams,Headers  } from '@angular/http';
import { Location } from '../../providers/location';
import { Globals } from '../../providers/globals';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

/*
  Generated class for the Postnews page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-postnews',
  templateUrl: 'postnews.html',
  providers: [Camera]
})
export class PostnewsPage {

  image = '';
  item = '';
  lat = '';
  long = '';


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private alertCtrl: AlertController,
    private globals: Globals,
    private location: Location,
    private http:Http
  ) {
    if (this.globals.position) {
      this.lat = globals.position.coords.latitude.toString();
      this.long = globals.position.coords.longitude.toString();
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostnewsPage');

    if (this.globals.position) {
      this.lat = this.globals.position.coords.latitude.toString();
      this.long = this.globals.position.coords.longitude.toString();
    }

  }

  takeImage() {

    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((image) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.image = image;
    }, (err) => {
      // Handle error
    }).catch(err => {
      this.image = err;
    });
  }

  takeText() {
    let prompt = this.alertCtrl.create({
      title: 'Message',
      message: "Enter your message",
      inputs: [
        {
          name: 'title',
          placeholder: 'message'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            console.log('Saved clicked' + data.title);
            this.item = data.title;

          }
        }
      ]
    });
    prompt.present();
  }

  sendNotification() {
    if (this.image) {
      let data = new URLSearchParams();
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8;');
      data.append('u', this.globals.userName);
      data.append('t',"hhh");
      data.append('image',this.image);
      this.http.post(this.globals.WEBSITE_URL + "sendNotificationImage.php", data,{headers:headers}).map(res => res.text()).toPromise().then(res=>{
        // alert(JSON.stringify(res));
      }).catch(err=>{
        alert(err);
      });
    }
    if (this.item) {
      let data = new URLSearchParams();
      data.append('u', this.globals.userName);
      data.append('m', this.item);
      this.http.post(this.globals.WEBSITE_URL + "sendNotificationMessage.php", data).map(res => res.json()).toPromise().then(res => {
        // alert('Message Successfully Sent');
      }).catch(err => {
        alert("Something went wrong")
      });
    }
    let locationData = new URLSearchParams();
    console.log(this.globals.userName);
    console.log(this.globals.position.coords.latitude.toString());
    console.log(this.globals.position.coords.longitude.toString());
    locationData.append('u', this.globals.userName);
    locationData.append('lat', this.globals.position.coords.latitude.toString());
    locationData.append('langt', this.globals.position.coords.longitude.toString());
    return this.http.post(this.globals.WEBSITE_URL + "sendNotificationLocation.php", locationData).map(res => res.json()).toPromise().then(res=>{
      let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'Message sent Successfully.',
      buttons: ['OK']
    });
    alert.present();
    });
  }

}
