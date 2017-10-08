import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PokeapiProvider } from '../../providers/pokeapi/pokeapi';
import { ItemDetailsPage } from '../item-details/item-details';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
// import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-item-list',
  templateUrl: 'item-list.html',
})
export class ItemListPage {
  private items = []; // list of items
  private offset = 1; // item id counter
  private loader:any;

  constructor(public navCtrl: NavController,
    private pokeapiProvider: PokeapiProvider,
    public loading: LoadingController,
    private storage: Storage) {
  }

  // when page loads
  ionViewDidLoad(){
    this.getStoredData();
  }

  private openItemDetails(i) {
    // go to pokemon details page
    return this.navCtrl.push(ItemDetailsPage, {item: i});
  }

  private doInfinite(infiniteScroll) {
    // when reached end of list, request more data
    setTimeout(() => {
      this.fetchItems();
      infiniteScroll.complete();
    }, 500);
  }

  private createLoading(){
    if (this.loader == null) {
      this.loader = this.loading.create({
        content: 'Looking for Poké-balls...',
      });
    }
  }

  private getItemList(id){
    this.pokeapiProvider.getItemById(id).then(data => {
      console.log('current item id: '+id);
      if(id < this.offset+15){
        this.items.push(data);
        // request next pokemon data
        this.getItemList(++id);
      } else {
        this.loader.dismiss();
        this.loader = null;
        // set breakpoint
        this.offset = id;
        // store all pokemons and current offset
        this.storage.ready().then(() => {
          console.log('storage is ready, storing items...');
          this.storage.set('items', JSON.stringify(this.items));
          this.storage.set('item_offset', this.offset);
        });
      }
    });
  }

  private fetchItems(){
    this.createLoading();
    this.loader.present().then(() => {
      this.getItemList(this.offset);
    });
  }

  private getStoredData() {
    this.storage.ready().then(() => {
      this.storage.get('items').then((stored_items) => {
        if(stored_items != null){
          this.items = JSON.parse(stored_items);
        }
      });
      this.storage.get('item_offset').then((stored_offset) => {
        if(stored_offset != null){
          this.offset = stored_offset;
        } else {
          console.log("no stored items, requesting some...");
          this.fetchItems();
        }
      });
    });
  }
}
