import {Injectable} from "@angular/core";
import {Geolocation} from "ionic-native";

@Injectable()
export class GeolocationService {
  get() {
    // Return promise
    return Geolocation.getCurrentPosition();
  }
}
