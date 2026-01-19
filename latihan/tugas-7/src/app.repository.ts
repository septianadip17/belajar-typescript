import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppRepository {
  constructor(private dataSource: DataSource) {}

  // --- PRODUCT Queries ---
  async findAllProducts() {
    return await this.dataSource.query(`SELECT * FROM products`);
  }

  async findProductById(id: number) {
    const result = await this.dataSource.query(
      `SELECT * FROM products WHERE id = ?`,
      [id],
    );
    return result[0];
  }

  async updateProductStock(id: number, newStock: number) {
    await this.dataSource.query(`UPDATE products SET stock = ? WHERE id = ?`, [
      newStock,
      id,
    ]);
  }

  // --- CART Queries ---
  async findAllCartItems() {
    // Join biar sekalian dapat nama produk dan harga
    return await this.dataSource.query(`
      SELECT c.product_id, p.name, p.price, c.quantity 
      FROM cart_items c
      JOIN products p ON c.product_id = p.id
    `);
  }

  async findCartItemByProductId(productId: number) {
    const result = await this.dataSource.query(
      `SELECT * FROM cart_items WHERE product_id = ?`,
      [productId],
    );
    return result[0];
  }

  async addToCart(productId: number, quantity: number) {
    await this.dataSource.query(
      `INSERT INTO cart_items (product_id, quantity) VALUES (?, ?)`,
      [productId, quantity],
    );
  }

  async updateCartQty(productId: number, newQty: number) {
    await this.dataSource.query(
      `UPDATE cart_items SET quantity = ? WHERE product_id = ?`,
      [newQty, productId],
    );
  }

  async removeCartItem(productId: number) {
    await this.dataSource.query(`DELETE FROM cart_items WHERE product_id = ?`, [
      productId,
    ]);
  }

  async clearCart() {
    await this.dataSource.query(`DELETE FROM cart_items`);
  }
}
