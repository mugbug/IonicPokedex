import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PokemonDetailsPage } from '../pokemon-details/pokemon-details'
import { PokeapiProvider } from '../../providers/pokeapi/pokeapi';
import { LoadingController } from 'ionic-angular';

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
  offset = 0;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private pokeapiProvider: PokeapiProvider,
    public loading: LoadingController) {
      let loader = this.loading.create({
        content: 'Looking for Pokémons...',
      });
    
      loader.present().then(() => {
        for(let i=1; i<=15; i++){
          this.pokeapiProvider.getPokemonById(i)
          .subscribe(api_response => {
            this.pokemons.push(api_response);
          });
        }
        this.offset += 15;
        loader.dismiss();
      });
  }

  openPokemonDetails(p) {
    return this.navCtrl.push(PokemonDetailsPage, {pokemon: p});
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      for(let i=1; i<10; i++){
        this.pokeapiProvider.getPokemonById(i+this.offset)
        .subscribe(api_response => {
          this.pokemons.push(api_response);
        });
      }
      this.offset += 15;
      infiniteScroll.complete();
    }, 500);
  }
}
