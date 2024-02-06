import { Controller, Post, Body, Logger } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateSearchApiDto } from './dto/osm.dto';
import { OsmService } from './osm.service';

@Controller('osm')
export class OsmController {
  constructor(private readonly osmService: OsmService) {}

  // '43.16540434728322,-2.4239873886108403,43.18261784109349,-2.401371002197266'

  @Post()
  @ApiBody({ type: CreateSearchApiDto })
  @ApiOperation({
    summary:
      'Get OSM map objects with select Boundary Box / Area and apply desire filters',
    description: `
      Examples to make correctly requests:
      ======================================
      Boundary Box Uknown, for example Madrid is area.

      {
        "search": "Madrid",
        "filters": ["atm=yes",
                "amenity=atm"]
      }

      ======================================
      With Boundary Box (Madrid):
      {
        "bbox": "40.3119774,-3.8889539,40.6437293,-3.5179163",
        "filters": ["atm=yes",
                "amenity=atm"]
      }
      `,
  })
  async getZoneMapFeatures(@Body() body: CreateSearchApiDto): Promise<string> {
    Logger.log(`Input data : ${body}`);
    // Add manually filters
    // TODO take filters keys to generate values from constants
    // const filters = ['amenity=bar', 'amenity=restaurant', 'tourism=hotel'];
    const filters = body.filters || [];
    if (body.search && (!body.bbox || !body.bbox.length)) {
      return await this.osmService.getBoundaryBoundsMapFeatures(
        (await this.osmService.getLocationBySearch(body.search)) as string,
        filters,
      );
    }
    return await this.osmService.getBoundaryBoundsMapFeatures(
      body.bbox as string,
      filters,
    );
  }
}
