/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) {}

  getHello(): string {
    return 'Hello World!';
  }

  loginPage() {
    return {
      message: 'congrats, you are successfully logged in',
      data: 'no data',
    };
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
}
