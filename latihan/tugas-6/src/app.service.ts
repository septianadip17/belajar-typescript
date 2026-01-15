import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) {}

  getHello(): string {
    return 'Hello World!';
  }

  // --- 1. Function: getUserById ---
  // Mencari user berdasarkan ID di database
  async getUserById(id: number) {
    const query = `SELECT id, name, balance FROM users WHERE id = ?`;
    const result = await this.dataSource.query(query, [id]);

    if (result.length === 0) {
      return null;
    }
    return result[0];
  }

  // --- 2. Function: checkBalance ---
  async checkBalance(userId: number) {
    const user = await this.getUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      message: 'Cek saldo berhasil',
      data: {
        name: user.name,
        balance: user.balance,
      },
    };
  }

  // --- 3. Function: topUp ---
  async topUp(userId: number, amount: number) {
    if (amount <= 0) return 'Invalid amount';

    // Cek User Ada atau Tidak
    const user = await this.getUserById(userId);
    if (!user) return 'User not found';

    // A. Update Saldo User (Tambah)
    await this.dataSource.query(
      `UPDATE users SET balance = balance + ? WHERE id = ?`,
      [amount, userId],
    );

    // B. Catat Transaksi
    // sender = NULL (karena topup dari luar), receiver = userId
    await this.dataSource.query(
      `INSERT INTO transactions (sender, receiver, amount, type) VALUES (NULL, ?, ?, 'TOPUP')`,
      [userId, amount],
    );

    return 'Top up success';
  }

  // --- 4. Function: transfer ---
  async transfer(fromId: number, toId: number, amount: number) {
    if (amount <= 0) return 'Invalid amount';
    if (fromId === toId) return 'Cannot transfer to self';

    // Ambil Data Pengirim & Penerima
    const sender = await this.getUserById(fromId);
    const receiver = await this.getUserById(toId);

    // Validasi User
    if (!sender || !receiver) return 'user not found';

    // Validasi Saldo Pengirim
    if (sender.balance < amount) {
      return 'Insufficient balance';
    }

    // Eksekusi Transfer
    // A. Kurangi Saldo Pengirim
    await this.dataSource.query(
      `UPDATE users SET balance = balance - ? WHERE id = ?`,
      [amount, fromId],
    );

    // B. Tambah Saldo Penerima
    await this.dataSource.query(
      `UPDATE users SET balance = balance + ? WHERE id = ?`,
      [amount, toId],
    );

    // C. Catat Transaksi (sender = fromId, receiver = toId)
    await this.dataSource.query(
      `INSERT INTO transactions (sender, receiver, amount, type) VALUES (?, ?, ?, 'TRANSFER')`,
      [fromId, toId, amount],
    );

    return 'Transfer success';
  }

  // --- 5. Function: getUserSummary ---
  async getUserSummary() {
    const result = await this.dataSource.query(
      `SELECT name, balance FROM users`,
    );

    // Format string sesuai keinginanmu: "Nama - Rp.Saldo"
    const dataUser: string[] = result.map((user: any) => {
      return `${user.name} - Rp.${user.balance}`;
    });

    return dataUser;
  }
}
