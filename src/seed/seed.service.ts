import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Poke } from 'src/poke/entities/poke.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/HttpAdapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel( Poke.name)
    private readonly pokemonModel: Model<Poke>,
    private readonly http: AxiosAdapter,
  ){}

  async executeSeed(){

    await this.pokemonModel.deleteMany();

    const data = await this.http.get<PokeResponse>(process.env.POKEDATA);
    const pokemonToInsert: {name: string, nro: number}[] = [];
    data.results.forEach(async ({name, url}) => {
      const segments = url.split('/');
      const nro: number = +segments[segments.length -2];
      pokemonToInsert.push({name, nro});
    });
    this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed';
  }
}
