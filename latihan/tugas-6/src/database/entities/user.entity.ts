import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('saldo_orang')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  balance: number;
}
