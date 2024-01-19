import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokeDto } from './dto/create-poke.dto';
import { UpdatePokeDto } from './dto/update-poke.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Poke } from './entities/poke.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokeService {

  private defaultLimit: number;
  private defaultOffset: number;
  
  constructor(
    @InjectModel(Poke.name)
    private readonly pokeModel: Model<Poke>,
    private readonly configService: ConfigService,
  ){
    this.defaultLimit = this.configService.get<number>('defaultLimit');
    this.defaultOffset = this.configService.get<number>('defaultOffset');
  }

  async create(createPokeDto: CreatePokeDto) {
    try{
      createPokeDto.name = createPokeDto.name.toLowerCase();
      const pokemon = await this.pokeModel.create(createPokeDto);
      return pokemon;
    } catch (error){
      this.handlerExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    
    const {
      limit = this.defaultLimit,
      offset = this.defaultOffset,
    } = paginationDto;
    const pokemons = await this.pokeModel.find()
      .limit(limit)
      .skip(offset)
      .select('-__v');
    return pokemons;
  }

  async findOne(term: string) {
    let pokemon: Poke;
    if(!isNaN(+term)){
      pokemon = await this.pokeModel.findOne({nro: term});
    }
    if(isValidObjectId(term)){
      pokemon = await this.pokeModel.findById(term);
    }
    if(!pokemon){
      pokemon = await this.pokeModel.findOne({name: term.toLocaleLowerCase().trim()});
    }
    if(!pokemon) throw new NotFoundException('Pokemon not exist in database');
  
  return pokemon;
  }

  async update(term: string, updatePokeDto: UpdatePokeDto) {
    const pokemon = await this.findOne( term );
    try{

      if( updatePokeDto.name ){
        updatePokeDto.name = updatePokeDto.name.toLocaleLowerCase();
  
        await pokemon.updateOne(updatePokeDto, {new: true});
      }
      return {...pokemon.toJSON(), ...updatePokeDto};
    } catch(error){
      this.handlerExceptions(error);
    }
  }

  async remove(id: string) {

    //const pokemon = await this.pokeModel.findByIdAndDelete(id);
    const {deletedCount} = await this.pokeModel.deleteOne({_id: id});
    if(deletedCount===0){
      throw new BadRequestException(`Id not found`);
    }
    return;
  }

  private handlerExceptions(error: any){
    if(error.code === 11000){
      throw new BadRequestException(`Pokemon already exists in database ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create pokemon ~ Check server logs`);
  }

}
