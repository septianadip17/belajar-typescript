import { Injectable, NotFoundException } from '@nestjs/common';
import { AppRepository } from './app.repository'; // Import Repository yang baru kita buat

@Injectable()
export class AppService {
  // Inject Repository di sini (Bukan DataSource lagi)
  constructor(private readonly appRepository: AppRepository) {}

  getHello(): string {
    return 'Hello World!';
  }

  // --- 1. Cek Saldo ---
  async checkBalance(userId: number) {
    const user = await this.appRepository.findUserById(userId);

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

  // --- 2. Top Up ---
  async topUp(userId: number, amount: number) {
    if (amount <= 0) return 'Invalid amount';

    // Cek User via Repository
    const user = await this.appRepository.findUserById(userId);
    if (!user) return 'User not found';

    // A. Update Saldo via Repository
    await this.appRepository.updateBalance(userId, amount);

    // B. Catat Transaksi via Repository
    await this.appRepository.createTransaction(null, userId, amount, 'TOPUP');

    return 'Top up success';
  }

  // --- 3. Transfer ---
  async transfer(fromId: number, toId: number, amount: number) {
    if (amount <= 0) return 'Invalid amount';
    if (fromId === toId) return 'Cannot transfer to self';

    // Ambil Data via Repository
    const sender = await this.appRepository.findUserById(fromId);
    const receiver = await this.appRepository.findUserById(toId);

    // Logic Validasi
    if (!sender || !receiver) return 'user not found';
    if (sender.balance < amount) return 'Insufficient balance';

    // Eksekusi via Repository
    // 1. Kurangi Pengirim (dikali -1 biar berkurang)
    await this.appRepository.updateBalance(fromId, -amount);

    // 2. Tambah Penerima
    await this.appRepository.updateBalance(toId, amount);

    // 3. Catat History
    await this.appRepository.createTransaction(
      fromId,
      toId,
      amount,
      'TRANSFER',
    );

    return 'Transfer success';
  }

  // --- 4. Summary ---
  async getUserSummary() {
    const result = await this.appRepository.findAllUsers();

    // Mapping data (Logic Bisnis)
    const dataUser: string[] = result.map((user: any) => {
      return `${user.name} - Rp.${user.balance}`;
    });

    return dataUser;
  }
}
