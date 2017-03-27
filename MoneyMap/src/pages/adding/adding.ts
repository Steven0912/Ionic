import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {Transaction} from "../../database";
import {GeolocationService} from "../../services/geolocation.service";

/*
 Generated class for the Adding page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-adding',
  templateUrl: 'adding.html'
})
export class AddingPage {

  model: Transaction = new Transaction(null, "");
  shouldGeolocate: boolean = false;
  shouldSend: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocator: GeolocationService) {
  }

  ionViewDidLoad() {
    this.model = new Transaction(null, "");
  }

  getLocation() {
    if (this.shouldGeolocate) {
      this.shouldSend = false;
      this.geolocator.get().then((resultado) => {
        // Establecer latitud y longitud en el modelo
        this.model.setCoords(resultado.coords);
        this.shouldSend = true;
      }).catch((err) => console.log(err));
    } else {
      // TO DO
      this.model.cleandCoords();
    }
  }

  save() {
    if (this.shouldSend) {
      this.model.save().then(result => {
        this.model = new Transaction(null, "");
        this.navCtrl.pop();
      });
    }
  }
}
