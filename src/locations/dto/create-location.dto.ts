import { Transform, TransformFnParams } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({}, { each: true })
  coordinates: [number, number];

  @IsEnum(
    [
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
    {
      message: 'Valid type required',
    },
  )
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
