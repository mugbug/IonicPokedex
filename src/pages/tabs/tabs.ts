import { Component } from '@angular/core';

import { PokemonListPage } from '../pokemon-list/pokemon-list';
import { ItemListPage } from '../item-list/item-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PokemonListPage;
  tab2Root = ItemListPage;

  constructor() {

  }
}
