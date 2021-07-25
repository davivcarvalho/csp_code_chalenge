import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ContactsModule } from './useCases/contacts/contacts.module'
import { PhonesModule } from './useCases/phones/phones.module'

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
      entities: [__dirname + '/entities/*{.ts,.js}']
    }),
    ContactsModule,
    PhonesModule
  ]
})
export class AppModule {}
