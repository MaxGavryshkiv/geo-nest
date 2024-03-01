import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService } from './locations.service';
import { getModelToken } from '@nestjs/mongoose';

import { Location } from './schemas/location.schema';
import { Model } from 'mongoose';

import { LocationModel } from './support/location.model';

import { locationStub } from './stubs/location.stub';
import { NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';

describe('LocationsService', () => {
  let locationsService: LocationsService;
  // let model: Model<Location>;
  // let model: LocationModel;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [
  //       LocationsService,
  //       {
  //         provide: getModelToken(Location.name),
  //         // useValue: Model,
  //         useValue: LocationModel,
  //       },
  //     ],
  //   }).compile();

  //   locationsService = module.get<LocationsService>(LocationsService);
  //   // model = module.get<Model<Location>>(getModelToken(Location.name));
  //   model = module.get<LocationModel>(getModelToken(Location.name));
  // });

  // beforeEach(async () => {
  // jest.spyOn(model, 'find').mockImplementation(
  //   () =>
  //     ({
  //       exec: jest.fn().mockResolvedValue([locationStub()]),
  //     }) as any,
  // );
  //   locations = await locationsService.findAll();

  // });

  // .mockImplementation(() => ({
  //   exec: jest.fn().mockResolvedValue([locationStub()]),
  // }));

  describe('find operators', () => {
    let model: LocationModel;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          LocationsService,
          {
            provide: getModelToken(Location.name),
            useValue: LocationModel,
          },
        ],
      }).compile();

      locationsService = module.get<LocationsService>(LocationsService);
      model = module.get<LocationModel>(getModelToken(Location.name));

      console.log(model);

      jest.clearAllMocks();
    });

    describe('findAll', () => {
      describe('when findAll is called', () => {
        let locations: Location[];

        beforeEach(async () => {
          jest.spyOn(model, 'find');
          locations = await locationsService.findAll();
        });

        test('then it should call Model find', () => {
          expect(model.find).toHaveBeenCalled();
        });

        test('then it should return a locations array', () => {
          expect(locations).toEqual([locationStub()]);
        });
      });
    });

    describe('findOne', () => {
      describe('when findOne is called', () => {
        let location: Location;

        beforeEach(async () => {
          jest.spyOn(model, 'findById');
          // .mockResolvedValue(locationStub());
          location = await locationsService.findOne(locationStub()._id);
        });

        // test('then it should call Model findById', () => {
        //   expect(model.findById).toHaveBeenCalledWith(locationStub()._id);
        // });

        test('then it should return a location', () => {
          expect(location).toEqual(locationStub());
        });

        // test('then it should throw and Error if location is not found', async () => {
        //   jest.spyOn(model, 'findById').mockResolvedValue(null);

        //   await expect(
        //     locationsService.findOne(locationStub()._id),
        //   ).rejects.toThrow(NotFoundException);
        // });
      });
    });
  });

  describe('create operations', () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          LocationsService,
          {
            provide: getModelToken(Location.name),
            useValue: LocationModel,
          },
        ],
      }).compile();

      locationsService = module.get<LocationsService>(LocationsService);
    });

    describe('create', () => {
      describe('when create is called', () => {
        let location: Location;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;

        let createLocationDto: CreateLocationDto;

        beforeEach(async () => {
          createLocationDto = {
            name: locationStub().name,
            coordinates: locationStub().coordinates,
            type: locationStub().type,
          };

          saveSpy = jest.spyOn(Model.prototype, 'save');
          location = await locationsService.create(createLocationDto);
        });

        test('then it should call Model save', () => {
          expect(saveSpy).toHaveBeenCalledWith(createLocationDto);
        });

        test('then it should return a location', () => {
          expect(location).toEqual(locationStub());
        });
      });
    });
  });
});
