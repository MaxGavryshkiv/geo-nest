import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationsModule } from './locations/locations.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { OsmModule } from './osm/osm.module';
import env from '../env';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'env.ts' }),
    MongooseModule.forRoot(`${env.MONGODB_URI}${env.DB_NAME}`),
    LocationsModule,
    OsmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
