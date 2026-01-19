import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'product_id' })
  productId: number;

  @Column()
  quantity: number;
}
