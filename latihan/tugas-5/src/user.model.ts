/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsInt } from 'class-validator';
import { Expose } from 'class-transformer';

export class AddUserDto {
  @IsString()
  @Expose({ name: 'name' })
  userName: string;

  @IsString()
  @Expose({ name: 'address' })
  userAddress: string;

  @IsInt()
  @Expose({ name: 'age' })
  userAge: number;

  @IsString()
  @Expose({ name: 'jobs' })
  userJobs: string;

  constructor(
    userName: string,
    userAddress: string,
    userAge: number,
    userJobs: string,
  ) {
    this.userName = userName;
    this.userAddress = userAddress;
    this.userAge = userAge;
    this.userJobs = userJobs;
  }
}
