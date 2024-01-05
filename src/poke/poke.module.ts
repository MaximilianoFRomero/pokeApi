import { Module } from '@nestjs/common';
import { PokeService } from './poke.service';
import { PokeController } from './poke.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Poke, PokeSchema } from './entities/poke.entity';

@Module({
  controllers: [PokeController],
  providers: [PokeService],
  imports: [
    MongooseModule.forFeature([
      {
      name: Poke.name,
      schema: PokeSchema
      }
    ])
  ]
})
export class PokeModule {}
