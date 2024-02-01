import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { UpdateLocationDto } from './dto/update-location.dto';
import { CreateLocationDto } from './dto/create-location.dto';
import { Types } from 'mongoose';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  findAll() {
    return this.locationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId) {
    return this.locationsService.findOne(id);
  }

  @Post()
  create(
    @Body(ValidationPipe)
    createLocationDto: CreateLocationDto,
  ) {
    return this.locationsService.create(createLocationDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: Types.ObjectId,
    @Body(ValidationPipe)
    updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationsService.update(id, updateLocationDto);
  }

  @Delete(':id')
  delete(@Param('id') id: Types.ObjectId) {
    return this.locationsService.delete(id);
  }
}
