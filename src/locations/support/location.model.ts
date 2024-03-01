import { MockModel } from './mock.model';
import { Location } from '../schemas/location.schema';
import { locationStub } from '../stubs/location.stub';

export class LocationModel extends MockModel<Location> {
  protected mockStub = locationStub();
}
