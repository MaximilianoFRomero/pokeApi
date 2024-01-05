import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PokeService } from './poke.service';
import { CreatePokeDto } from './dto/create-poke.dto';
import { UpdatePokeDto } from './dto/update-poke.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('poke')
export class PokeController {
  constructor(private readonly pokeService: PokeService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() createPokeDto: CreatePokeDto) {
    return this.pokeService.create(createPokeDto);
  }

  @Get()
  findAll() {
    return this.pokeService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.pokeService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updatePokeDto: UpdatePokeDto) {
    return this.pokeService.update(term, updatePokeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokeService.remove(id);
  }
}
