import Dexie from "../node_modules/dexie/dist/dexie";
export class TransactionAppDB extends Dexie {

  transactions: Dexie.Table<ITransaction, number>;

  constructor() {
    super("MoneyMapAppDB");

    this.version(1).stores({
      transactions: '++id, amount, lat, lon, title, imageUrl'
    });

    this.transactions.mapToClass(Transaction);
  }
}

export interface ICategory {

}

export interface ITransaction {
  id?: number;
  amount: number;
  lat: number;
  lon: number;
  title: string;
  imageUrl: string;
}

export class Transaction implements ITransaction {
  id?: number;
  amount: number;
  lat: number;
  lon: number;
  title: string;
  imageUrl: string;

  constructor(amount: number, title: string, id?: number, lat?: number, lon?: number, imageUrl ?: string) {
    this.amount = amount;
    this.title = title;
    if (id) this.id = id;
    if (lat) this.lat = lat;
    if (lon) this.lon = lon;
    if (imageUrl) this.imageUrl = imageUrl;
  }

  save() {
    return db.transactions.add(this);
  }

  setCoords(coords){
    this.lat = coords.latitude;
    this.lon = coords.longitude;
  }

  cleandCoords(){
    this.lat = null;
    this.lon = null;
  }

  static all() {
    // Transaction.all() devuelve todas las transacciones
    // retorna un promise
    return db.transactions.orderBy("id").reverse().toArray();
  }
}

export let db = new TransactionAppDB();
