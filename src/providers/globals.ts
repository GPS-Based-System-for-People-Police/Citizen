import { Geoposition } from '@ionic-native/geolocation';
import { Injectable } from '@angular/core';

@Injectable()
export class Globals {

  public isMapLoadedFirstTime = 2;
  public userName='';
  public WEBSITE_URL='http://mabcoder.tk/insec/';
  public position:Geoposition;

  constructor() {}

}
