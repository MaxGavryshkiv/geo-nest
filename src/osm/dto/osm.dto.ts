import { ApiProperty } from '@nestjs/swagger';

export class CreateSearchApiDto {
  @ApiProperty()
  around: string;
}
