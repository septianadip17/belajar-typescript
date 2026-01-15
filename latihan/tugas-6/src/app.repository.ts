import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppRepository {
  constructor(private dataSource: DataSource) {}

  // Ambil user by ID
  async findUserById(id: number) {
    const query = `SELECT id, name, balance FROM users WHERE id = ?`;
    const result = await this.dataSource.query(query, [id]);
    return result.length > 0 ? result[0] : null;
  }

  // Ambil semua user
  async findAllUsers() {
    return await this.dataSource.query(`SELECT name, balance FROM users`);
  }

  // Update saldo (bisa nambah atau kurang tergantung nilai amount)
  async updateBalance(userId: number, amount: number) {
    // amount positif = nambah, amount negatif = kurang
    // tapi karena query kita "balance + ?", maka kita kirim angka apa adanya
    await this.dataSource.query(
      `UPDATE users SET balance = balance + ? WHERE id = ?`,
      [amount, userId],
    );
  }

  // Catat transaksi
  async createTransaction(
    senderId: number | null,
    receiverId: number,
    amount: number,
    type: 'TOPUP' | 'TRANSFER',
  ) {
    await this.dataSource.query(
      `INSERT INTO transactions (sender, receiver, amount, type) VALUES (?, ?, ?, ?)`,
      [senderId, receiverId, amount, type],
    );
  }
}
