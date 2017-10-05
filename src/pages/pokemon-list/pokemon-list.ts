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
  pokemon: {
    id:number,
    name:string
  }
  pokemons = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private pokeapiProvider: PokeapiProvider) {
    // for(var i=1; i<10; i++){
    //   this.pokeapiProvider.getPokemonById(i)
    //   .subscribe(api_response => {
    //     this.pokemon.name = api_response.name;
    //   });
    //   this.pokemons.push(this.pokemon);
    // }
  }

  ionViewWillEnter(){
    for(let i=1; i<21; i++){
      this.pokeapiProvider.getPokemonById(i)
      .subscribe(api_response => {
        this.pokemons.push(api_response);
      });
    }
  }

  openPokemonDetails(id) {
    
    this.navCtrl.push(PokemonDetailsPage)
  }
}
