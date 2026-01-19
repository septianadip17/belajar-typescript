import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AddToCartDto } from './dto/add-to-cart.dto'; // Import DTO

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Endpoint: GET /products
  @Get('products')
  async getProducts() {
    return await this.appService.getProductSummary();
  }

  // Endpoint: GET /cart
  @Get('cart')
  async getCart() {
    return await this.appService.getCart();
  }
  // Endpoint: POST /cart
  //
  @Post('cart')
  async addToCart(@Body() payload: AddToCartDto) {
    return await this.appService.addToCart(payload.productId, payload.quantity);
  }

  // Endpoint: DELETE /cart/:id
  @Delete('cart/:id')
  async removeFromCart(@Param('id') id: string) {
    return await this.appService.removeFromCart(Number(id));
  }

  // Endpoint: POST /checkout
  @Post('checkout')
  async checkout() {
    return await this.appService.checkout();
  }
}
