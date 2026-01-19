import { AppService } from './app.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getProducts(): Promise<any>;
    getCart(): Promise<{
        items: any;
        totalPayment: number;
    }>;
    addToCart(payload: AddToCartDto): Promise<{
        message: string;
    }>;
    removeFromCart(id: string): Promise<{
        message: string;
    }>;
    checkout(): Promise<{
        message: string;
    }>;
}
