import { AppRepository } from './app.repository';
export declare class AppService {
    private readonly appRepository;
    constructor(appRepository: AppRepository);
    getProductSummary(): Promise<any>;
    addToCart(productId: number, quantity: number): Promise<"Invalid quantity" | "Product not found" | "Out of stock" | "Total quantity exceeds stock" | "Added to cart">;
    removeFromCart(productId: number): Promise<"Product not in cart" | "Removed from cart">;
    getCart(): Promise<{
        items: any;
        totalPayment: number;
    }>;
    checkout(): Promise<"Cart is empty" | "Checkout success">;
}
