import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ContactsModule } from './useCases/contacts/contacts.module'

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
      logging: true,
      entities: [__dirname + '/entities/*{.ts,.js}']
    }),
    ContactsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
