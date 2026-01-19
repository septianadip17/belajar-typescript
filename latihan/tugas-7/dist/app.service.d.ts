import { AppRepository } from './app.repository';
export declare class AppService {
    private readonly appRepository;
    constructor(appRepository: AppRepository);
    getProductSummary(): Promise<any>;
    addToCart(productId: number, quantity: number): Promise<{
        message: string;
    }>;
    getCart(): Promise<{
        items: any;
        totalPayment: number;
    }>;
    removeFromCart(productId: number): Promise<{
        message: string;
    }>;
    checkout(): Promise<{
        message: string;
    }>;
}
