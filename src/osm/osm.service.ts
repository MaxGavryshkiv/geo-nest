import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import env from '../../env';
import { createQueryInfo } from '../helpers/query';

@Injectable()
export class OsmService {
  /**
   * Get select filter and add boundary box section all map features
   * @param bbox Geographic zone boundary limits. Need two points. For example north east and just in diagonal south west
   * @returns
   */
  async getBoundaryBoundsMapFeatures(
    bbox: string,
    filters: Array<string> = [],
  ) {
    const overpassQuery = createQueryInfo({
      bbox,
      outputFormat: env.OUTPUT_FORMAT.JSON,
      timeOutInSeconds: 50,
      filters,
    });

    Logger.log(`Query:\n ${overpassQuery}`);

    try {
      const res = await axios.post(env.OVERPASS_API, overpassQuery);
      console.log('OK', bbox);
      return res.data;
    } catch (err) {
      console.log('ERROR', bbox);
    }
  }

  /**
   * Format Boundary Box from result that take in Nominatim API Search
   * @param boundingbox [south, north, west, east]
   * @returns string 'south,west,north,east'
   */
  private async getLocationBoundaryBox(boundingbox: Array<string>) {
    // Convert [south, north, west, east] => [south,west,north,east]
    const temp = boundingbox[1];
    boundingbox[1] = boundingbox[2];
    boundingbox[2] = temp;
    return boundingbox.join(',');
  }

  /**
   * Obtain boundary box limits from specific zone that uknown boundary box limits data
   * @param searchTerm name of town, area, province,...
   * @returns boundary box limits
   */
  async getLocationBySearch(searchTerm: string) {
    try {
      Logger.log(`Take data from: ${env.NOMINATIM_OSM_API}${searchTerm}`);
      const res = await axios.get(`${env.NOMINATIM_OSM_API}${searchTerm}`);
      console.log('OK');
      return this.getLocationBoundaryBox(res.data[0]['boundingbox']);
    } catch (err) {
      console.log('ERROR', `${env.NOMINATIM_OSM_API}${searchTerm}`);
    }
  }
}
