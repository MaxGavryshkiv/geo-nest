import { ApiProperty } from '@nestjs/swagger';

export class CreateSearchApiDto {
  @ApiProperty()
  firstPoint: string;
  @ApiProperty()
  secondPoint: string;
}
