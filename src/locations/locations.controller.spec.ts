import { Location } from './schemas/location.schema';

import { Test, TestingModule } from '@nestjs/testing';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { locationStub } from './stubs/location.stub';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

jest.mock('./locations.service.ts');

describe('LocationsController', () => {
  let locationsController: LocationsController;
  let locationsService: LocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [LocationsController],
      providers: [LocationsService],
    }).compile();

    locationsController = module.get<LocationsController>(LocationsController);
    locationsService = module.get<LocationsService>(LocationsService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let locations: Location[];

      beforeEach(async () => {
        locations = await locationsController.findAll();
      });

      test('then it should call LocationsService', () => {
        expect(locationsService.findAll).toHaveBeenCalled();
      });
      test('then it return array of locations', () => {
        expect(locations).toEqual([locationStub()]);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let location: Location;

      beforeEach(async () => {
        location = await locationsController.findOne(locationStub()._id);
      });

      test('then it should call locationsService', () => {
        expect(locationsService.findOne).toHaveBeenCalledWith(
          locationStub()._id,
        );
      });

      test('then it return a location', () => {
        expect(location).toEqual(locationStub());
      });
    });
  });

  describe('create', () => {
    describe('when create is called', () => {
      let location: Location;
      let createLocationDto: CreateLocationDto;

      beforeEach(async () => {
        createLocationDto = {
          name: locationStub().name,
          coordinates: locationStub().coordinates,
          type: locationStub().type,
        };
        location = await locationsController.create(createLocationDto);
      });

      test('then it should call locationsService', () => {
        expect(locationsService.create).toHaveBeenCalledWith(createLocationDto);
      });

      test('then it return created location', () => {
        expect(location).toEqual(locationStub());
      });
    });
  });

  describe('update', () => {
    describe('when update is called', () => {
      let location: Location;
      let updateLocationDto: UpdateLocationDto;

      beforeEach(async () => {
        updateLocationDto = {
          name: "McDonald's",
          coordinates: [50.4511439, 30.5215726],
          type: 'fast_food',
        };
        location = await locationsController.update(
          locationStub()._id,
          updateLocationDto,
        );
      });

      test('then it should call locationsService', () => {
        expect(locationsService.update).toHaveBeenCalledWith(
          locationStub()._id,
          updateLocationDto,
        );
      });
      test('then it should return updated location', () => {
        expect(location).toEqual(locationStub());
      });
    });
  });

  describe('delete', () => {
    describe('when delete is called', () => {
      let location: Location;

      beforeEach(async () => {
        location = await locationsController.delete(locationStub()._id);
      });

      test('then it should call locationsService', () => {
        expect(locationsService.delete).toHaveBeenCalledWith(
          locationStub()._id,
        );
      });

      test('then it should return deleted location', () => {
        expect(location).toEqual(locationStub());
      });
    });
  });
});
