/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/await-thenable */
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserRow } from './user.interface';
import { format } from 'date-fns';
import { AddUserDto } from './user.model';

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) {}

  async getHello(): Promise<string> {
    return await 'Hello World!';
  }

  async checkDatabaseConnection() {
    try {
      const result = await this.dataSource.query('SELECT 1 + 1 AS sum');
      console.log('Hasil Query:', result);
      return {
        status: 'yeay!',
        message: 'Koneksi Database Berhasil!',
        data: result,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      return {
        status: 'Error',
        message: 'Gagal konek ke database',
        error: errorMessage,
      };
    }
  }

  async getAllUsers() {
    const query = `SELECT id, name, address, age, jobs, created_at FROM users`;
    const rawData: any[] = await this.dataSource.query(query);
    const users = rawData.map((raw) => {
      const user = {} as UserRow;
      user.id = raw.id;
      user.name = raw.name;
      user.address = raw.address;
      user.age = raw.age;
      user.jobs = raw.jobs;
      user.created_at = format(raw.created_at, 'dd-MM-yyyy');
      return user;
    });
    return users;
  }

  async getUserById(id: string) {
    const query = `SELECT id, name, address, age, jobs, created_at FROM users WHERE id = ?`;
    const rawData: any[] = await this.dataSource.query(query, [id]);
    const users = rawData.map((raw) => {
      const user = {} as UserRow;
      user.id = raw.id;
      user.name = raw.name;
      user.address = raw.address;
      user.age = raw.age;
      user.jobs = raw.jobs;
      user.created_at = format(raw.created_at, 'dd-MM-yyyy');
      return user;
    });
    return users;
  }

  async addUser(payload: AddUserDto) {
    const query = `INSERT INTO users(name, address, age, jobs) values(?, ?, ?, ?);`;
    const rawData = await this.dataSource.execute(query, [
      payload.userName,
      payload.userAddress,
      payload.userAge,
      payload.userJobs,
    ]);
    console.log(rawData);
    return 'berhasil';
  }
}
