import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PokeapiProvider } from '../../providers/pokeapi/pokeapi';
import { ItemDetailsPage } from '../item-details/item-details';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the ItemListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-list',
  templateUrl: 'item-list.html',
})
export class ItemListPage {
  items = [];
  offset = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private pokeapiProvider: PokeapiProvider,
    public loading: LoadingController) {
      let loader = this.loading.create({
        content: 'Looking for Poke-Balls...',
      });
    
      loader.present().then(() => {
        for(let i=1; i<=15; i++){
          this.pokeapiProvider.getItemById(i)
          .subscribe(api_response => {
            this.items.push(api_response);
            if(i>10) loader.dismiss();
          });
        }
        this.offset += 15;
      });
  }

  openItemDetails(i) {
    // go to item details page
    return this.navCtrl.push(ItemDetailsPage, {item: i});
  }

  doInfinite(infiniteScroll) {
    // when reached end of list, request more data
    setTimeout(() => {
      for(let i=1; i<=15; i++){
        this.pokeapiProvider.getItemById(i+this.offset)
        .subscribe(api_response => {
          this.items.push(api_response);
        });
      }
      this.offset += 15;
      infiniteScroll.complete();
    }, 500);
  }
}
