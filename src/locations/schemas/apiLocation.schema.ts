import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument, Types } from 'mongoose';

export type ApiLocationDocument = HydratedDocument<ApiLocation>;

@Schema({ collection: 'Location' })
export class ApiLocation {
  @Prop({ type: Types.ObjectId, required: true })
  _id: string;

  @Prop({ type: Number, required: false })
  __v: number;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: [Number, Number], required: true })
  coordinates: [number, number];

  @Prop({
    type: String,
    enum: [
      'bakery',
      'butcher',
      'chocolate',
      'frozen_food',
      'health_food',
      'seafood',
      'spices',
      'tea',
      'water',
      'food',
      'kiosk',
      'supermarket',
      'cafe',
      'fast_food',
      'food_court',
      'restaurant',
      'pharmacy',
    ],
    required: true,
  })
  type:
    | 'bakery'
    | 'butcher'
    | 'chocolate'
    | 'frozen_food'
    | 'health_food'
    | 'seafood'
    | 'spices'
    | 'tea'
    | 'water'
    | 'food'
    | 'kiosk'
    | 'supermarket'
    | 'cafe'
    | 'fast_food'
    | 'food_court'
    | 'restaurant'
    | 'pharmacy';
}

export const LocationSchema = SchemaFactory.createForClass(Location);
