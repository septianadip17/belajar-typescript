import { DataSource } from 'typeorm';
export declare class AppRepository {
    private dataSource;
    constructor(dataSource: DataSource);
    findAllProducts(): Promise<any>;
    findProductById(id: number): Promise<any>;
    updateProductStock(id: number, newStock: number): Promise<void>;
    findAllCartItems(): Promise<any>;
    findCartItemByProductId(productId: number): Promise<any>;
    addToCart(productId: number, quantity: number): Promise<void>;
    updateCartQty(productId: number, newQty: number): Promise<void>;
    removeCartItem(productId: number): Promise<void>;
    clearCart(): Promise<void>;
}
