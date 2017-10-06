import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PokeapiProvider } from '../../providers/pokeapi/pokeapi';

import { ItemListPage } from '../item-list/item-list';

/**
 * Generated class for the ItemDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {
  item;

  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    private pokeapiProvider: PokeapiProvider) {
      // get selected item
      this.item = this.navParams.get('item');
  }

}
