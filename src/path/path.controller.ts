import { Controller, Body, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CreateSearchApiDto } from './dto/path.dto';
import { PathService } from './path.service';

@Controller('path')
export class PathController {
  constructor(private readonly pathService: PathService) {}

  @Post()
  @ApiBody({ type: CreateSearchApiDto })
  async getZoneMapFeatures(@Body() body: CreateSearchApiDto) {
    return await this.pathService.getInfoByCoordAndArea(
      body.firstPoint,
      body.secondPoint,
    );
  }
}
