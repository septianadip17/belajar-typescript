import { Injectable, NotFoundException } from '@nestjs/common';
import { AppRepository } from './app.repository';

@Injectable()
export class AppService {
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
    const user = await this.appRepository.findUserById(userId);
    if (!user) return 'User not found';
    await this.appRepository.updateBalance(userId, amount);
    await this.appRepository.createTransaction(null, userId, amount, 'TOPUP');

    return 'Top up success';
  }

  // --- 3. Transfer ---
  async transfer(fromId: number, toId: number, amount: number) {
    if (amount <= 0) return 'Invalid amount';
    if (fromId === toId) return 'Cannot transfer to self';
    const sender = await this.appRepository.findUserById(fromId);
    const receiver = await this.appRepository.findUserById(toId);
    if (!sender || !receiver) return 'user not found';
    if (sender.balance < amount) return 'Insufficient balance';
    await this.appRepository.updateBalance(fromId, -amount);
    await this.appRepository.updateBalance(toId, amount);
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
    const dataUser: string[] = result.map((user: any) => {
      return `${user.name} - Rp.${user.balance}`;
    });

    return dataUser;
  }
}
