import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokeModule } from './poke/poke.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfig } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';


@Module({
  imports: [ConfigModule.forRoot({
    load: [EnvConfig],
    validationSchema: JoiValidationSchema,
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname,'..','public'),
  }),
  MongooseModule.forRoot(process.env.MONGODB, {
    dbName: 'pokemonsDb'
  }),
  PokeModule,
  CommonModule,
  SeedModule],
})
export class AppModule {}
