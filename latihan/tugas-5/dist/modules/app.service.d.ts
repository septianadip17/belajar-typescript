import { AppRepository } from './users/app.repository';
import { AddUserDto } from './user.model';
export declare class AppService {
    private appRepository;
    constructor(appRepository: AppRepository);
    getHello(): Promise<string>;
    checkDatabaseConnection(): Promise<{
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
    getAllUsers(): Promise<UserRow[]>;
    getUserById(id: string): Promise<UserRow[]>;
    addUser(payload: AddUserDto): Promise<{
        message: string;
        data: AddUserDto;
    }>;
}
