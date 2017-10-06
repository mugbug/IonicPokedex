import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PokeapiProvider } from '../../providers/pokeapi/pokeapi';

import { PokemonListPage } from '../pokemon-list/pokemon-list';


@IonicPage()
@Component({
  selector: 'page-pokemon-details',
  templateUrl: 'pokemon-details.html',
})
export class PokemonDetailsPage {
  pokemon;

  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    private pokeapiProvider: PokeapiProvider) {
      this.pokemon = this.navParams.get('pokemon')
  }
  ionViewWillEnter() {
    // this.pokemon = 'Pikachuhu';
  }

}
