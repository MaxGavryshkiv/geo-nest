import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Location } from './schemas/location.schema';
import { UpdateLocationDto } from './dto/update-location.dto';
import { CreateLocationDto } from './dto/create-location.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<Location>,
  ) {}

  async findAll(): Promise<Location[]> {
    return this.locationModel.find().exec();
  }

  async findOne(id: string): Promise<Location> {
    const result = await this.locationModel.findById(id);
    if (!result) throw new NotFoundException('Location With This Id Not Found');
    return result;
  }

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const createLocation = new this.locationModel(createLocationDto);
    return createLocation.save();
  }

  async update(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    const result = await this.locationModel.findByIdAndUpdate(
      { _id: id },
      updateLocationDto,
      { new: true },
    );

    if (!result) throw new NotFoundException('Location With This Id Not Found');

    return result;
  }

  async delete(id: string): Promise<Location> {
    const result = await this.locationModel.findOneAndDelete({ _id: id });

    if (!result) throw new NotFoundException('Location With This Id Not Found');

    return result;
  }
}
