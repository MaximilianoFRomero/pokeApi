import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { PokeService } from './poke.service';
import { CreatePokeDto } from './dto/create-poke.dto';
import { UpdatePokeDto } from './dto/update-poke.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('poke')
export class PokeController {
  constructor(private readonly pokeService: PokeService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() createPokeDto: CreatePokeDto) {
    return this.pokeService.create(createPokeDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.pokeService.findAll(paginationDto);
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
