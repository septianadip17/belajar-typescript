import { DataSource } from 'typeorm';
import { UserRow } from './user.interface';
export declare class AppService {
    private dataSource;
    constructor(dataSource: DataSource);
    getHello(): Promise<string>;
    checkDatabaseConnection(): Promise<{
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
    getAllUsers(): Promise<UserRow[]>;
    getUserById(id: string): Promise<UserRow[]>;
}
