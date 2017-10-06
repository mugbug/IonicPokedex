import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PokemonDetailsPage } from '../pokemon-details/pokemon-details'
import { PokeapiProvider } from '../../providers/pokeapi/pokeapi';

/**
 * Generated class for the PokemonListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pokemon-list',
  templateUrl: 'pokemon-list.html',
})
export class PokemonListPage {
  pokemons = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private pokeapiProvider: PokeapiProvider) {
      for(let i=1; i<10; i++){
        this.pokeapiProvider.getPokemonById(i+155)
        .subscribe(api_response => {
          this.pokemons.push(api_response);
        });
      }
  }

  openPokemonDetails(p) {
    return this.navCtrl.push(PokemonDetailsPage, {pokemon: p});
  }
}
