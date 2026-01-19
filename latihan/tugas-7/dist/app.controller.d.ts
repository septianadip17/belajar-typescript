import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getProducts(): Promise<any>;
    getCart(): Promise<{
        items: any;
        totalPayment: number;
    }>;
    addToCart(payload: {
        productId: number;
        quantity: number;
    }): Promise<"Invalid quantity" | "Product not found" | "Out of stock" | "Total quantity exceeds stock" | "Added to cart">;
    removeFromCart(id: string): Promise<"Product not in cart" | "Removed from cart">;
    checkout(): Promise<"Cart is empty" | "Checkout success">;
}
