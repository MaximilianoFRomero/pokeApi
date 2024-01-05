import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokeModule } from './poke/poke.module';
import { CommonModule } from './common/common.module';


@Module({
  imports: [ConfigModule.forRoot(), ServeStaticModule.forRoot({
    rootPath: join(__dirname,'..','public'),
  }),
  MongooseModule.forRoot(process.env.MONGODB),
  PokeModule,
  CommonModule],
})
export class AppModule {}
