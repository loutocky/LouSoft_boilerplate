import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  public lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  public password: string;
}
