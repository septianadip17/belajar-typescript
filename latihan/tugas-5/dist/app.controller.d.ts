import { AppService } from './app.service';
import { AddUserDto } from './user.model';
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
        error: string;
        data?: undefined;
    }>;
    getAllUsers(): Promise<import("./user.interface").UserRow[]>;
    getUserById(id: string): Promise<import("./user.interface").UserRow[]>;
    addUser(payload: AddUserDto): Promise<{
        message: string;
        data: AddUserDto;
    }>;
}
