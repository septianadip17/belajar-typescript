import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { TopUpDto } from './dto/topup.dto';
import { TransferDto } from './dto/transfer.dto';

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
  async topUp(@Body() payload: TopUpDto) {
    return await this.appService.topUp(payload.userId, payload.amount);
  }

  // Endpoint: POST /transfer
  @Post('transfer')
  async transfer(@Body() payload: TransferDto) {
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
