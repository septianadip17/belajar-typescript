"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let AppRepository = class AppRepository {
    dataSource;
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async findAllProducts() {
        return await this.dataSource.query(`SELECT id, name, price, stock FROM products`);
    }
    async findProductById(id) {
        const result = await this.dataSource.query(`SELECT id, name, price, stock FROM products WHERE id = ?`, [id]);
        return result.length > 0 ? result[0] : null;
    }
    async updateProductStock(id, newStock) {
        await this.dataSource.query(`UPDATE products SET stock = ? WHERE id = ?`, [
            newStock,
            id,
        ]);
    }
    async findAllCartItems() {
        const query = `
      SELECT c.product_id, p.name, p.price, c.quantity 
      FROM cart_items c
      JOIN products p ON c.product_id = p.id
    `;
        return await this.dataSource.query(query);
    }
    async findCartItemByProductId(productId) {
        const query = `SELECT id, product_id, quantity FROM cart_items WHERE product_id = ?`;
        const result = await this.dataSource.query(query, [productId]);
        return result.length > 0 ? result[0] : null;
    }
    async addToCart(productId, quantity) {
        await this.dataSource.query(`INSERT INTO cart_items (product_id, quantity) VALUES (?, ?)`, [productId, quantity]);
    }
    async updateCartQty(productId, newQty) {
        await this.dataSource.query(`UPDATE cart_items SET quantity = ? WHERE product_id = ?`, [newQty, productId]);
    }
    async removeCartItem(productId) {
        await this.dataSource.query(`DELETE FROM cart_items WHERE product_id = ?`, [
            productId,
        ]);
    }
    async clearCart() {
        await this.dataSource.query(`DELETE FROM cart_items`);
    }
};
exports.AppRepository = AppRepository;
exports.AppRepository = AppRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], AppRepository);
//# sourceMappingURL=app.repository.js.map