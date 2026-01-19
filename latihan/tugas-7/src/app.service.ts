import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AppRepository } from './app.repository';

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) {}

  // 1. Get Product Summary
  async getProductSummary() {
    const products = await this.appRepository.findAllProducts();
    // Format string sesuai kodinganmu
    return products.map(
      (p: any) => `${p.name} - Rp${p.price} (Stock: ${p.stock})`,
    );
  }

  // 2. Add To Cart
  async addToCart(productId: number, quantity: number) {
    if (quantity <= 0) return 'Invalid quantity';

    // Cek Produk
    const product = await this.appRepository.findProductById(productId);
    if (!product) return 'Product not found';

    // Cek Stok
    if (quantity > product.stock) return 'Out of stock';

    // Cek apakah barang sudah ada di cart?
    const existingItem =
      await this.appRepository.findCartItemByProductId(productId);

    if (existingItem) {
      // Kalau ada, update qty (tambah)
      const newQty = existingItem.quantity + quantity;
      // Validasi lagi, jangan sampai qty di cart melebihi stock real
      if (newQty > product.stock) return 'Total quantity exceeds stock';

      await this.appRepository.updateCartQty(productId, newQty);
    } else {
      // Kalau belum ada, insert baru
      await this.appRepository.addToCart(productId, quantity);
    }

    return 'Added to cart';
  }

  // 3. Remove From Cart
  async removeFromCart(productId: number) {
    const existingItem =
      await this.appRepository.findCartItemByProductId(productId);
    if (!existingItem) return 'Product not in cart';

    await this.appRepository.removeCartItem(productId);
    return 'Removed from cart';
  }

  // 4. Get Cart Total (Lihat keranjang + Total Harga)
  async getCart() {
    const items = await this.appRepository.findAllCartItems();

    let totalPayment = 0;
    for (const item of items) {
      totalPayment += item.price * item.quantity;
    }

    return {
      items: items,
      totalPayment: totalPayment,
    };
  }

  // 5. Checkout
  async checkout() {
    const cartItems = await this.appRepository.findAllCartItems();
    if (cartItems.length === 0) return 'Cart is empty';

    // Loop setiap item di cart untuk kurangi stok produk
    for (const item of cartItems) {
      const product = await this.appRepository.findProductById(item.product_id);
      if (product) {
        const remainingStock = product.stock - item.quantity;
        // Update stok di tabel products
        await this.appRepository.updateProductStock(product.id, remainingStock);
      }
    }

    // Kosongkan keranjang
    await this.appRepository.clearCart();

    return 'Checkout success';
  }
}
