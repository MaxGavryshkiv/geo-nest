import { Injectable } from '@nestjs/common';
import axios from 'axios';
import env from '../../env';
import { UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class OsmService {
  async getInfoByCoordAndArea(around: string) {
    if (!around)
      throw new UnprocessableEntityException('Parameter «around» is required!');

    const query = `[out:json][timeout:50];
    (
     node["shop"~"bakery|butcher|chocolate|frozen_food|health_food|seafood|spices|tea|water|food|kiosk|supermarket"](around:${around});
     node["amenity"~"cafe|fast_food|food_court|restaurant|pharmacy"](around:${around});
    );
    out body;`;

    try {
      const res = await axios.post(env.OVERPASS_API, query);
      return res.data;
    } catch (err) {
      return err;
    }
  }
}
