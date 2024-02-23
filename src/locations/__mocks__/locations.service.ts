import { locationStub } from '../stubs/location.stub';
export const LocationsService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([locationStub()]),
  findOne: jest.fn().mockResolvedValue(locationStub()),
  create: jest.fn().mockResolvedValue(locationStub()),
  update: jest.fn().mockResolvedValue(locationStub()),
  delete: jest.fn().mockResolvedValue(locationStub()),
});
