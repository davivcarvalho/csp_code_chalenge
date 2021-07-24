import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysqldb',
      port: 3306,
      username: 'root',
      password: 'example',
      database: 'csp',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
