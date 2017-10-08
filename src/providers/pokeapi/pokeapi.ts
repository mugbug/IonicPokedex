import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PokeapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PokeapiProvider {

  url = 'https://pokeapi.co/api/v2/';

  constructor(public http: Http) {
  }

  getPokemonById(id: number): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.url+'pokemon/'+id+'/')
      .map(api_response => api_response.json())
      .subscribe(data => {
        resolve(data);
      })
    });
  }

  getItemById(id){
    return this.http.get(this.url+'item/'+id+'/')
    .map(api_response => api_response.json());
  }
}
