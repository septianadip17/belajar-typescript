import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'from_user_id', nullable: true })
  fromUserId: number;

  @Column({ name: 'to_user_id' })
  toUserId: number;

  @Column()
  amount: number;

  @Column({ type: 'enum', enum: ['TOPUP', 'TRANSFER'] })
  type: 'TOPUP' | 'TRANSFER';

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
