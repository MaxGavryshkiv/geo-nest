import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationsModule } from './locations/locations.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { OsmModule } from './osm/osm.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(`${process.env.MONGODB_URI}${process.env.DB_NAME}`),
    LocationsModule,
    OsmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
