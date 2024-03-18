import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService } from './locations.service';
import { getModelToken } from '@nestjs/mongoose';

import { Location } from './schemas/location.schema';
import { Model } from 'mongoose';

import { LocationModel } from './support/location.model';

import { locationStub, updatedLocationStub } from './stubs/location.stub';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { NotFoundException } from '@nestjs/common';

describe('LocationsService', () => {
  let locationsService: LocationsService;

  describe('find operations', () => {
    let locationModel: Model<Location>;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          LocationsService,
          {
            provide: getModelToken(Location.name),
            useValue: Model<Location>,
          },
        ],
      }).compile();

      locationsService = module.get<LocationsService>(LocationsService);
      locationModel = module.get<Model<Location>>(getModelToken(Location.name));

      jest.clearAllMocks();
    });

    describe('findAll', () => {
      describe('when findAll is called', () => {
        let locations: Location[];

        beforeEach(async () => {
          jest.spyOn(locationModel, 'find').mockImplementation(
            () =>
              ({
                exec: jest.fn().mockResolvedValue([locationStub()]),
              }) as any,
          );
          locations = await locationsService.findAll();
        });

        test('then it should call locationModel find', () => {
          expect(locationModel.find).toHaveBeenCalled();
        });

        test('then it should return array of locations', () => {
          expect(locations).toEqual([locationStub()]);
        });
      });
    });

    describe('findOne', () => {
      describe('when findOne is called', () => {
        let location: Location;

        beforeEach(async () => {
          jest
            .spyOn(locationModel, 'findById')
            .mockResolvedValue(locationStub());
          location = await locationsService.findOne(locationStub()._id);
        });

        test('then it should call locationModule findById', () => {
          expect(locationModel.findById).toHaveBeenCalledWith(
            locationStub()._id,
          );
        });

        test('then it should return a location', () => {
          expect(location).toEqual(locationStub());
        });
      });

      test('then it should throw and Error if location is not found', async () => {
        jest.spyOn(locationModel, 'findById').mockResolvedValue(null);
        await expect(
          locationsService.findOne(locationStub()._id),
        ).rejects.toThrow(NotFoundException);
      });
    });

    describe('update', () => {
      describe('when update is called', () => {
        let location: Location;
        let updateLocationDto: UpdateLocationDto;

        beforeEach(async () => {
          updateLocationDto = {
            name: updatedLocationStub().name,
            coordinates: updatedLocationStub().coordinates,
            type: updatedLocationStub().type,
          };

          jest
            .spyOn(locationModel, 'findByIdAndUpdate')
            .mockResolvedValue(updatedLocationStub());
          location = await locationsService.update(
            locationStub()._id,
            updateLocationDto,
          );
        });

        test('then it should call locationModule findByIdAndUpdate', () => {
          expect(locationModel.findByIdAndUpdate).toHaveBeenCalledWith(
            { _id: locationStub()._id },
            updateLocationDto,
            { new: true },
          );
        });

        test('then it should return a location', () => {
          expect(location).toEqual(updatedLocationStub());
        });
      });

      test('then it should throw and Error if location is not found', async () => {
        jest.spyOn(locationModel, 'findByIdAndUpdate').mockResolvedValue(null);
        await expect(
          locationsService.update(locationStub()._id, {
            name: updatedLocationStub().name,
            coordinates: updatedLocationStub().coordinates,
            type: updatedLocationStub().type,
          }),
        ).rejects.toThrow(NotFoundException);
      });
    });

    describe('delete', () => {
      describe('when delete is called', () => {
        let location: Location;

        beforeEach(async () => {
          jest
            .spyOn(locationModel, 'findOneAndDelete')
            .mockResolvedValue(locationStub());
          location = await locationsService.delete(locationStub()._id);
        });

        test('then it should call locationModule findOneAndDelete', () => {
          expect(locationModel.findOneAndDelete).toHaveBeenCalledWith({
            _id: locationStub()._id,
          });
        });

        test('then it should return deleted location', () => {
          expect(location).toEqual(locationStub());
        });

        test('then it should throw and Error if location is not found', async () => {
          jest.spyOn(locationModel, 'findOneAndDelete').mockResolvedValue(null);
          await expect(
            locationsService.delete(locationStub()._id),
          ).rejects.toThrow(NotFoundException);
        });
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

          saveSpy = jest.spyOn(LocationModel.prototype, 'save');
          constructorSpy = jest.spyOn(
            LocationModel.prototype,
            'constructorSpy',
          );
          location = await locationsService.create(createLocationDto);
        });

        test('then it should call locationModel save', () => {
          expect(saveSpy).toHaveBeenCalled();
          expect(constructorSpy).toHaveBeenCalledWith(createLocationDto);
        });

        test('then it should return created location', () => {
          expect(location).toEqual(locationStub());
        });
      });
    });
  });
});
