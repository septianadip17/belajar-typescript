import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Lihat daftar produk
  @Get('products')
  async getProducts() {
    return await this.appService.getProductSummary();
  }

  // Lihat keranjang & total
  @Get('cart')
  async getCart() {
    return await this.appService.getCart();
  }

  // Tambah ke keranjang
  @Post('cart')
  async addToCart(@Body() payload: { productId: number; quantity: number }) {
    return await this.appService.addToCart(payload.productId, payload.quantity);
  }

  // Hapus dari keranjang
  @Delete('cart/:id')
  async removeFromCart(@Param('id') id: string) {
    return await this.appService.removeFromCart(Number(id));
  }

  // Checkout
  @Post('checkout')
  async checkout() {
    return await this.appService.checkout();
  }
}
