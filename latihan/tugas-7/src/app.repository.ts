import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppRepository {
  constructor(private dataSource: DataSource) {}

  // --- BAGIAN PRODUK ---

  // Ambil semua produk (Sebutkan kolomnya manual)
  async findAllProducts() {
    return await this.dataSource.query(
      `SELECT id, name, price, stock FROM products`,
    );
  }

  // Cari produk by ID
  async findProductById(id: number) {
    const result = await this.dataSource.query(
      `SELECT id, name, price, stock FROM products WHERE id = ?`,
      [id],
    );
    return result.length > 0 ? result[0] : null;
  }

  // Update stok
  async updateProductStock(id: number, newStock: number) {
    await this.dataSource.query(`UPDATE products SET stock = ? WHERE id = ?`, [
      newStock,
      id,
    ]);
  }

  // get all carts
  async findAllCartItems() {
    const query = `
      SELECT c.product_id, p.name, p.price, c.quantity 
      FROM cart_items c
      JOIN products p ON c.product_id = p.id
    `;
    return await this.dataSource.query(query);
  }

  // checking item
  async findCartItemByProductId(productId: number) {
    const query = `SELECT id, product_id, quantity FROM cart_items WHERE product_id = ?`;
    const result = await this.dataSource.query(query, [productId]);
    return result.length > 0 ? result[0] : null;
  }

  // Insert ke cart
  async addToCart(productId: number, quantity: number) {
    await this.dataSource.query(
      `INSERT INTO cart_items (product_id, quantity) VALUES (?, ?)`,
      [productId, quantity],
    );
  }

  // Update qty cart
  async updateCartQty(productId: number, newQty: number) {
    await this.dataSource.query(
      `UPDATE cart_items SET quantity = ? WHERE product_id = ?`,
      [newQty, productId],
    );
  }

  // Hapus item cart
  async removeCartItem(productId: number) {
    await this.dataSource.query(`DELETE FROM cart_items WHERE product_id = ?`, [
      productId,
    ]);
  }

  // Kosongkan cart
  async clearCart() {
    await this.dataSource.query(`DELETE FROM cart_items`);
  }
}
