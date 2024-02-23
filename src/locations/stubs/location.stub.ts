import { Location } from '../schemas/location.schema';

export const locationStub = (): Location => {
  return {
    _id: '65cf757969a1cf582076e31b',
    name: 'Фора',
    coordinates: [50.4465756, 30.523146],
    type: 'supermarket',
    __v: 0,
  };
};
