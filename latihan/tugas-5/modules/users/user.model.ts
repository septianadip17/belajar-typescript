import { IsString, IsInt } from 'class-validator';

export class AddUserDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsInt()
  age: number;

  @IsString()
  jobs: string;
}
