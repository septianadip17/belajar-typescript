import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  // Endpoint: GET /balance/1
  @Get('balance/:id')
  async checkBalance(@Param('id') id: string) {
    return await this.appService.checkBalance(Number(id));
  }

  // Endpoint: POST /topup
  @Post('topup')
  async topUp(@Body() payload: { userId: number; amount: number }) {
    return await this.appService.topUp(payload.userId, payload.amount);
  }

  // Endpoint: POST /transfer
  @Post('transfer')
  async transfer(
    @Body() payload: { fromId: number; toId: number; amount: number },
  ) {
    return await this.appService.transfer(
      payload.fromId,
      payload.toId,
      payload.amount,
    );
  }

  // Endpoint: GET /summary
  @Get('summary')
  async getUserSummary() {
    return await this.appService.getUserSummary();
  }
}
