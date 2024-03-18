import { ApiLocation } from '../schemas/apiLocation.schema';

export const locationStub = (): ApiLocation => {
  return {
    _id: '65cf757969a1cf582076e31b',
    name: 'Фора',
    coordinates: [50.4465756, 30.523146],
    type: 'supermarket',
    __v: 0,
  };
};
export const updatedLocationStub = (): ApiLocation => {
  return {
    _id: '65cf757969a1cf582076e31b',
    name: "McDonald's",
    coordinates: [50.4511439, 30.5215726],
    type: 'fast_food',
    __v: 0,
  };
};
