import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { PokemonDetailsPage } from '../pokemon-details/pokemon-details'
import { PokeapiProvider } from '../../providers/pokeapi/pokeapi';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-pokemon-list',
  templateUrl: 'pokemon-list.html',
})
export class PokemonListPage {
  private pokemons = [];
  private loader:any;
  private offset = 1;

  constructor(private navCtrl: NavController,
    private pokeapiProvider: PokeapiProvider,
    private loading: LoadingController,
    private storage: Storage) {
  }

  // when page loads
  ionViewWillEnter(){
    this.getStoredData();
  }

  private openPokemonDetails(p) {
    // go to pokemon details page
    return this.navCtrl.push(PokemonDetailsPage, {pokemon: p});
  }

  private doInfinite(infiniteScroll) {
    // when reached end of list, request more data
    setTimeout(() => {
      this.fetchPokemons();
      infiniteScroll.complete();
    }, 500);
  }

  private createLoading(){
    if (this.loader == null) {
      this.loader = this.loading.create({
        content: 'Looking for Pokémons...',
      });
    }
  }

  private getPokemonList(id){
    this.pokeapiProvider.getPokemonById(id).then(data => {
      console.log('current id: '+id);
      if(id < this.offset+15){
        this.pokemons.push(data);
        // request next pokemon data
        this.getPokemonList(++id);
      } else {
        console.log('dismissing loading');
        this.loader.dismiss();
        this.loader = null;
        // set breakpoint
        this.offset = id;
        // store all pokemons and current offset
        console.log('storing data...');
        this.storage.ready().then(() => {
          console.log('storage is ready.');
          this.storage.set('pokemons', JSON.stringify(this.pokemons));
          this.storage.set('offset', this.offset);
        });
        console.log('data stored!');
      }

    });
  }

  private fetchPokemons(){
    this.createLoading();
    this.loader.present().then(() => {
      this.getPokemonList(this.offset);
    });
  }

  private getStoredData() {
    this.storage.ready().then(() => {
      this.storage.get('pokemons').then((stored_pokemons) => {
        if(stored_pokemons != null){
          this.pokemons = JSON.parse(stored_pokemons);
        } else {
          console.log("no stored pokemons");
        }
      });
      this.storage.get('offset').then((stored_offset) => {
        if(stored_offset != null){
          console.log(stored_offset);
          this.offset = stored_offset;
        } else {
          console.log("no stored offset");
          this.fetchPokemons();
        }
      });
    });
  }
}
