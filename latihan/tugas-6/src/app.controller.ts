import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/login')
  loginPage() {
    return this.appService.loginPage();
  }

  @Get('test-db')
  async testConnection() {
    return await this.appService.checkDatabaseConnection();
  }
}
