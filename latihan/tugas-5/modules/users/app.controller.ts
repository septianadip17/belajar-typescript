import {
  Body,
  Controller,
  Dependencies,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AddUserDto } from './user.model';

@Controller()
@Dependencies(AppService)
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('test-db')
  async testConnection() {
    return await this.appService.checkDatabaseConnection();
  }

  @Get('user')
  async getAllUsers() {
    return await this.appService.getAllUsers();
  }

  @Get('/user/:id')
  async getUserById(@Param('id') id: string) {
    return await this.appService.getUserById(id);
  }

  @Post()
  async addUser(@Body() payload: AddUserDto) {
    return await this.appService.addUser(payload);
  }
}
