import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-pokemon-details',
  templateUrl: 'pokemon-details.html',
})
export class PokemonDetailsPage {
  pokemon;

  constructor(private navParams: NavParams) {
      // get selected pokemon
      this.pokemon = this.navParams.get('pokemon')
  }

}
