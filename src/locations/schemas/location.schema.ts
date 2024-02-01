import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type LocationDocument = HydratedDocument<Location>;

@Schema()
export class Location {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: [Number, Number], required: true })
  coordinates: [number, number];

  @Prop({
    type: String,
    enum: ['city', 'museum', 'park', 'library'],
    required: true,
  })
  type: 'city' | 'museum' | 'park' | 'library';
}

export const LocationSchema = SchemaFactory.createForClass(Location);
