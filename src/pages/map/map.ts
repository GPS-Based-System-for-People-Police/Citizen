import { Globals } from './../../providers/globals';
import { RootPagePage } from './../root-page/root-page';
import { Component, ViewChild } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { Location, PoliceLocationInfo } from './../../providers/location';
import { LoginPage } from './../login/login';
import { App } from 'ionic-angular';

import { NavController, NavParams, Platform, Nav } from 'ionic-angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  currentLocation: string = '';
  userName: string = '';
  visibleRegion: any;
  map: GoogleMap;
  position: Geoposition;
  @ViewChild(Nav) nav: Nav;
  policeMarkers: any[];

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private geolocation: Geolocation,
    private googleMaps: GoogleMaps,
    private platform: Platform,
    private storage: Storage,
    private location: Location,
    private globals: Globals,
    private appCtrl: App
  ) {
  }

  // Load map only after view is initialize
  ngAfterViewInit() {

    this.storage.get('authentication').then((val) => {
      if (val == null) {
        console.log('Authentication has not been set');
        console.log(val);
      } else {
        this.userName = val.userName;
        this.globals.userName=val.userName;
        console.log(val);
      }
    });
    this.currentPosition();
  }

  currentPosition() {

    this.platform.ready().then(() => {

      // get current position
      this.geolocation.getCurrentPosition().then(pos => {
        console.log(pos);
        this.position = pos;
        this.globals.position=pos;
        this.currentLocation = pos.coords.latitude + ', ' + pos.coords.longitude;
        this.loadMap();
      });
      const watch = this.geolocation.watchPosition().subscribe(pos => {
        console.log(pos);
        this.position = pos;
        this.globals.position=pos;
        this.currentLocation = pos.coords.latitude + ', ' + pos.coords.longitude;
        this.location.setLoc(this.userName, pos.coords.longitude, pos.coords.latitude).then(res => {
          if (res.t == 's') {
            console.log(pos);
          } else {
            console.log('Failed');
          }
        }).catch(err => {
          console.log('Failed to load');
        });
      });
      // to stop watching
      //watch.unsubscribe();
      this.loadMap();
    });
  }

  loadMap() {
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    this.map = this.googleMaps.create(element);

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => this.currentLocation = 'Map is ready');

    // This is not required, because we are capturing our current position manually by fab component
    this.map.setMyLocationEnabled(true);
    this.map.setCompassEnabled(true);
    this.map.setAllGesturesEnabled(true);

  }

  logOut() {
    this.storage.ready().then(() => {
      this.storage.clear();
      this.appCtrl.getRootNav().setRoot(LoginPage);
    });
  }

}
