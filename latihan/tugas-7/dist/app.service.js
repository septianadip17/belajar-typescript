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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const app_repository_1 = require("./app.repository");
let AppService = class AppService {
    appRepository;
    constructor(appRepository) {
        this.appRepository = appRepository;
    }
    async getProductSummary() {
        const products = await this.appRepository.findAllProducts();
        return products.map((p) => `${p.name} - Rp${p.price} (Stock: ${p.stock})`);
    }
    async addToCart(productId, quantity) {
        if (quantity <= 0)
            return 'Invalid quantity';
        const product = await this.appRepository.findProductById(productId);
        if (!product)
            return 'Product not found';
        if (quantity > product.stock)
            return 'Out of stock';
        const existingItem = await this.appRepository.findCartItemByProductId(productId);
        if (existingItem) {
            const newQty = existingItem.quantity + quantity;
            if (newQty > product.stock)
                return 'Total quantity exceeds stock';
            await this.appRepository.updateCartQty(productId, newQty);
        }
        else {
            await this.appRepository.addToCart(productId, quantity);
        }
        return 'Added to cart';
    }
    async removeFromCart(productId) {
        const existingItem = await this.appRepository.findCartItemByProductId(productId);
        if (!existingItem)
            return 'Product not in cart';
        await this.appRepository.removeCartItem(productId);
        return 'Removed from cart';
    }
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
    async checkout() {
        const cartItems = await this.appRepository.findAllCartItems();
        if (cartItems.length === 0)
            return 'Cart is empty';
        for (const item of cartItems) {
            const product = await this.appRepository.findProductById(item.product_id);
            if (product) {
                const remainingStock = product.stock - item.quantity;
                await this.appRepository.updateProductStock(product.id, remainingStock);
            }
        }
        await this.appRepository.clearCart();
        return 'Checkout success';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [app_repository_1.AppRepository])
], AppService);
//# sourceMappingURL=app.service.js.map