import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
}
