import { Dependencies, Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { AddUserDto } from './user.model';

@Injectable()
@Dependencies(AppRepository)
export class AppService {
  constructor(private appRepository: AppRepository) {}

  async getHello(): Promise<string> {
    return await this.appRepository.getHello();
  }

  async checkDatabaseConnection() {
    return await this.appRepository.checkDatabaseConnection();
  }

  async getAllUsers() {
    return await this.appRepository.getAllUsers();
  }

  async getUserById(id: string) {
    return await this.appRepository.getUserById(id);
  }

  async addUser(payload: AddUserDto) {
    return await this.appRepository.addUser(payload);
  }
}
