import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { PokemonListPage } from '../pages/pokemon-list/pokemon-list';
import { ItemListPage } from '../pages/item-list/item-list';
import { TabsPage } from '../pages/tabs/tabs';

import { PokemonDetailsPage } from '../pages/pokemon-details/pokemon-details';
import { ItemDetailsPage } from '../pages/item-details/item-details';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PokeapiProvider } from '../providers/pokeapi/pokeapi';

@NgModule({
  declarations: [
    MyApp,
    PokemonListPage,
    PokemonDetailsPage,
    ItemListPage,
    ItemDetailsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PokemonListPage,
    PokemonDetailsPage,
    ItemListPage,
    ItemDetailsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PokeapiProvider
  ]
})
export class AppModule {}
