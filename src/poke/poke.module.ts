import { Module } from '@nestjs/common';
import { PokeService } from './poke.service';
import { PokeController } from './poke.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Poke, PokeSchema } from './entities/poke.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokeController],
  providers: [PokeService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
      name: Poke.name,
      schema: PokeSchema
      }
    ])
  ],
  exports: [MongooseModule]
})
export class PokeModule {}
