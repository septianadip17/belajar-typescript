import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';
import { Product } from './database/entities/product.entity';
import { CartItem } from './database/entities/cart-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rootpassword',
      database: 'ecommerce',
      entities: [Product, CartItem],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppRepository],
})
export class AppModule {}
