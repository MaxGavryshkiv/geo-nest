import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CreateSearchApiDto } from './dto/osm.dto';
import { OsmService } from './osm.service';

@Controller('osm')
export class OsmController {
  constructor(private readonly osmService: OsmService) {}

  @Post()
  @ApiBody({ type: CreateSearchApiDto })
  async getZoneMapFeatures(@Body() body: CreateSearchApiDto) {
    return await this.osmService.getInfoByCoordAndArea(body.around as string);
  }
}
