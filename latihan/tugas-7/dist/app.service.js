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
            throw new common_1.BadRequestException('Quantity invalid');
        const product = await this.appRepository.findProductById(productId);
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        if (quantity > product.stock) {
            throw new common_1.BadRequestException(`Stok kurang. Sisa stok: ${product.stock}`);
        }
        const existingItem = await this.appRepository.findCartItemByProductId(productId);
        if (existingItem) {
            const totalNewQty = existingItem.quantity + quantity;
            if (totalNewQty > product.stock) {
                throw new common_1.BadRequestException('Total quantity melebihi stok tersedia');
            }
            await this.appRepository.updateCartQty(productId, totalNewQty);
        }
        else {
            await this.appRepository.addToCart(productId, quantity);
        }
        return { message: 'Berhasil dimasukkan ke keranjang' };
    }
    async getCart() {
        const items = await this.appRepository.findAllCartItems();
        let totalPayment = 0;
        const detailItems = items.map((item) => {
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
    async removeFromCart(productId) {
        const existingItem = await this.appRepository.findCartItemByProductId(productId);
        if (!existingItem)
            throw new common_1.NotFoundException('Barang tidak ada di keranjang');
        await this.appRepository.removeCartItem(productId);
        return { message: 'Barang dihapus dari keranjang' };
    }
    async checkout() {
        const cartItems = await this.appRepository.findAllCartItems();
        if (cartItems.length === 0)
            throw new common_1.BadRequestException('Keranjang kosong');
        for (const item of cartItems) {
            const product = await this.appRepository.findProductById(item.product_id);
            if (product) {
                const remainingStock = product.stock - item.quantity;
                if (remainingStock >= 0) {
                    await this.appRepository.updateProductStock(product.id, remainingStock);
                }
            }
        }
        await this.appRepository.clearCart();
        return { message: 'Checkout berhasil! Stok sudah dikurangi.' };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [app_repository_1.AppRepository])
], AppService);
//# sourceMappingURL=app.service.js.map