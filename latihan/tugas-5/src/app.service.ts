/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserRow } from './user.interface';
@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) { }

  async getHello(): Promise<string> {
    return 'Hello World!';
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
      return {
        status: 'Error',
        message: 'Gagal konek ke database',
        error: error.message,
      };
    }
  }

  async getAllUsers() {
    const query = `SELECT id, name, address, age, jobs, created_at FROM users`
    const rawData: any[] = await this.dataSource.query(query)
    const users = rawData.map(raw => {
      const user = {} as UserRow
      user.id = raw.id;
      user.name = raw.name;
      user.address = raw.address;
      user.age = raw.age;
      user.jobs = raw.jobs;
      user.created_at = raw.created_at;
      return user;
    })
    return users;
  }

  async getUserById(id: string) {
    const query = `SELECT id, name, address, age, jobs, created_at FROM users WHERE id = ?`
    const rawData: any[] = await this.dataSource.query(query, [id])
    const users = rawData.map(raw => {
      const user = {} as UserRow
      user.id = raw.id;
      user.name = raw.name;
      user.address = raw.address;
      user.age = raw.age;
      user.jobs = raw.jobs;
      user.created_at = raw.created_at;
      return user;
    })
    return users;
  }
}
