/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
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
}
