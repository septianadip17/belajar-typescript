import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class AddToCartDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'Beli barang minimal 1 dong' })
  quantity: number;
}
