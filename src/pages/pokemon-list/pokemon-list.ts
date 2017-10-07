import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PokemonDetailsPage } from '../pokemon-details/pokemon-details'
import { PokeapiProvider } from '../../providers/pokeapi/pokeapi';
import { LoadingController } from 'ionic-angular';
// import { Storage } from '@ionic/storage';

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
  pokemons = []; // list of pokemons
  offset = 0;    // pokemon id counter

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private pokeapiProvider: PokeapiProvider,
    public loading: LoadingController) {
      // get stored data
      // this.storage.get('pokemons').then((pokemons) => {
      //   if(pokemons != null) {
      //     console.log(pokemons);

      //     this.pokemons = JSON.parse(pokemons);
      //     this.offset = this.pokemons.length;
      //     console.log("there is pokemons on db");
      //   }
      //   else console.log("there is no pokemons on db");

      // });

      // if pokemons is empty -- first time using app
      // fetches first pokemons
      // this.pokemons.length == 0 ? console.log("true") : console.log("false/#"+this.pokemons.length);


      // if(this.pokemons.length == 0){

      // }
  }

  // when page loads
  ionViewDidLoad(){
    // create a loading spinner
    let loader = this.loading.create({
      content: 'Looking for Pokémons...',
    });
    // present spinner while data is being fetched
    // then dismiss spinner
    loader.present().then(() => {
      for(let i=1; i<=15; i++){
        this.pokeapiProvider.getPokemonById(i)
        .subscribe(api_response => {
          // add pokemon to pokemons list
          this.pokemons.push(api_response);
          // store pokemons
          // this.storage.set('pokemons', JSON.stringify(this.pokemons));
          if(i>10) loader.dismiss();
        });
      } // end for

      // increment pokemon id counter
      this.offset += 15;
      // store current offset
      // this.storage.set('offset', JSON.stringify(this.offset));
    });
  }

  openPokemonDetails(p) {
    // go to pokemon details page
    return this.navCtrl.push(PokemonDetailsPage, {pokemon: p});
  }

  doInfinite(infiniteScroll) {
    // when reached end of list, request more data
    setTimeout(() => {
      for(let i=1; i<=15; i++){
        this.pokeapiProvider.getPokemonById(i+this.offset)
        .subscribe(api_response => {
          this.pokemons.push(api_response);
          // this.storage.set('pokemons', JSON.stringify(this.pokemons));
        });
      }
      this.offset += 15;
      infiniteScroll.complete();
    }, 500);
  }
}
