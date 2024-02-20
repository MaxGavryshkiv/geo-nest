import { Injectable } from '@nestjs/common';
import axios from 'axios';
import env from '../../env';
import { UnprocessableEntityException } from '@nestjs/common';
import { decode } from 'src/helpers/geomertyDecoder';

@Injectable()
export class PathService {
  async getInfoByCoordAndArea(firstPoint: string, secondPoint: string) {
    if (!firstPoint)
      throw new UnprocessableEntityException(
        'Parameter «firstPoint» is required!',
      );
    if (!secondPoint)
      throw new UnprocessableEntityException(
        'Parameter «secondPoint» is required!',
      );

    try {
      const res = await axios.get(
        `${env.OSRM_API}/car/${firstPoint};${secondPoint}?overview=full`,
      );

      try {
        res.data.routes[0].geometry = decode(res.data.routes[0].geometry, 5);
      } catch (error) {
        console.log(error);
      }

      return res.data;
    } catch (err) {
      return err;
    }
  }
}
