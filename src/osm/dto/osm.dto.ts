import { ApiProperty } from '@nestjs/swagger';

export class CreateSearchApiDto {
  @ApiProperty()
  bbox?: string;
  @ApiProperty()
  search?: string;
  @ApiProperty()
  filters?: Array<string>;
}
