import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {Transaction} from "../../database";
import {AddingPage} from "../adding/adding";

/*
 Generated class for the Transactions page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html'
})
export class TransactionsPage {

  title: string = "Movimientos";
  transactions: any;
  addingPage = AddingPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  // Este es como el onResume
  ionViewWillEnter() {

    /*let transaction = new Transaction(20, "Primera transaccion");
     transaction.save();*/

    this.loadTransactions();
  }

  loadTransactions(){
    Transaction.all().then((resultados) => {
      this.transactions = resultados
    });
  }

}
