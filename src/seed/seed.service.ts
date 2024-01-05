import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  async executeSeed(){
    const { data } = await this.axios.get<PokeResponse>(process.env.POKEDATA);

    data.results.forEach(({name, url}) => {
      const segments = url.split('/');
      const nro: number = +segments[segments.length -2];
      console.log({name, nro});
    })

    return data.results;
  }
}
