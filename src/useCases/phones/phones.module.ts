import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Contact } from 'src/entities/contact.entity'
import { Phone } from 'src/entities/phone.entity'
import { CreatePhoneController } from './createPhone/createPhone.controller'
import { CreatePhoneService } from './createPhone/createPhone.service'

@Module({
  imports: [TypeOrmModule.forFeature([Phone, Contact])],
  providers: [CreatePhoneService],
  controllers: [CreatePhoneController]
})
export class PhonesModule {}
