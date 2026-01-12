import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): Promise<string>;
    testConnection(): Promise<{
        status: string;
        message: string;
        data: any;
        error?: undefined;
    } | {
        status: string;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getAllUsers(): Promise<import("./user.interface").UserRow[]>;
    getUserById(id: string): Promise<import("./user.interface").UserRow[]>;
}
