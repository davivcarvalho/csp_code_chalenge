import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Contact } from './entities/contact.entity';
import { Phone } from './entities/phone.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysqldb',
      port: 3306,
      username: 'root',
      password: 'example',
      database: 'csp',
      synchronize: true,
      autoLoadEntities: true,
      entities: [Contact, Phone],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
