import { Injectable } from '@nestjs/common';
// import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { PokeResponse } from './interfaces/poke-response-interface';

@Injectable()
export class SeedService {
  
  //! Lo comentado fue como hecho en el curso, pero lo hice llamando al servicio de pokemon directamente, (agregue exportar el PokemonService en el PokemonModule tmb)

  // private readonly axios: AxiosInstance = axios;

  
  constructor(
    // @InjectModel(Pokemon.name)
    // private readonly pokemonModel: Model<Pokemon>
    private readonly pokemonService: PokemonService,
    private readonly http: AxiosAdapter
  ) {

  }

  async executeSeed() {

    await this.pokemonService.removeAll(); // primero limpiamos

    // const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    // const promises = [];
    const pokemonToInsert: {name: string, no: number}[] = [];

    data.results.forEach(({name, url}) => {

      const segments = url.split('/');

      const no: number = +segments[segments.length-2];

      // await this.pokemonModel.create({name, no});

      // await this.pokemonService.create({name, no});

      // promises.push(this.pokemonService.create({name, no}));
      pokemonToInsert.push({name, no});
    });

    // await Promise.all(promises);

    await this.pokemonService.insertMany(pokemonToInsert);

    return 'Seed executed';
  }

  
}
