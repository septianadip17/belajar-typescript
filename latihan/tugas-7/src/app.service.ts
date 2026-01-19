/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AppRepository } from './app.repository';

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) {}

  async getProductSummary() {
    const products = await this.appRepository.findAllProducts();
    return products.map(
      (p: any) => `${p.name} - Rp${p.price} (Stock: ${p.stock})`,
    );
  }

  async addToCart(productId: number, quantity: number) {
    if (quantity <= 0) throw new BadRequestException('Quantity invalid');
    const product = await this.appRepository.findProductById(productId);
    if (!product) throw new NotFoundException('Product not found');
    if (quantity > product.stock) {
      throw new BadRequestException(`Stok kurang. Sisa stok: ${product.stock}`);
    }

    const existingItem =
      await this.appRepository.findCartItemByProductId(productId);
    if (existingItem) {
      const totalNewQty = existingItem.quantity + quantity;
      if (totalNewQty > product.stock) {
        throw new BadRequestException('Total quantity melebihi stok tersedia');
      }
      await this.appRepository.updateCartQty(productId, totalNewQty);
    } else {
      await this.appRepository.addToCart(productId, quantity);
    }

    return { message: 'Berhasil dimasukkan ke keranjang' };
  }

  async getCart() {
    const items = await this.appRepository.findAllCartItems();
    let totalPayment = 0;
    const detailItems = items.map((item: any) => {
      const subtotal = item.price * item.quantity;
      totalPayment += subtotal;
      return {
        product: item.name,
        price: item.price,
        qty: item.quantity,
        subtotal: subtotal,
      };
    });

    return {
      items: detailItems,
      totalPayment: totalPayment,
    };
  }

  async removeFromCart(productId: number) {
    const existingItem =
      await this.appRepository.findCartItemByProductId(productId);
    if (!existingItem)
      throw new NotFoundException('Barang tidak ada di keranjang');
    await this.appRepository.removeCartItem(productId);
    return { message: 'Barang dihapus dari keranjang' };
  }

  // 5. Checkout
  async checkout() {
    const cartItems = await this.appRepository.findAllCartItems();
    if (cartItems.length === 0)
      throw new BadRequestException('Keranjang kosong');
    for (const item of cartItems) {
      const product = await this.appRepository.findProductById(item.product_id);

      if (product) {
        const remainingStock = product.stock - item.quantity;
        if (remainingStock >= 0) {
          await this.appRepository.updateProductStock(
            product.id,
            remainingStock,
          );
        }
      }
    }
    await this.appRepository.clearCart();

    return { message: 'Checkout berhasil! Stok sudah dikurangi.' };
  }
}
