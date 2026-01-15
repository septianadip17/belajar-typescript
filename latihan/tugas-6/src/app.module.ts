import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user.entity';
import { Transaction } from './transaction.entity';
import { AppRepository } from './app.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rootpassword',
      database: 'saldo_orang',
      entities: [User, Transaction],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([User, Transaction]),
  ],
  controllers: [AppController],
  providers: [AppService, AppRepository],
})
export class AppModule {}
