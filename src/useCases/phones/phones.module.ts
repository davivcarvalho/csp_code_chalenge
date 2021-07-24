import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Contact } from 'src/entities/contact.entity'
import { Phone } from 'src/entities/phone.entity'
import { CreatePhoneController } from './createPhone/createPhone.controller'
import { CreatePhoneService } from './createPhone/createPhone.service'
import { DeletePhoneController } from './deletePhone/deletePhone.controller'
import { DeletePhoneService } from './deletePhone/deletePhone.service'

@Module({
  imports: [TypeOrmModule.forFeature([Phone, Contact])],
  providers: [CreatePhoneService, DeletePhoneService],
  controllers: [CreatePhoneController, DeletePhoneController]
})
export class PhonesModule {}
