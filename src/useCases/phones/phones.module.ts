import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Contact } from 'src/entities/contact.entity'
import { Phone } from 'src/entities/phone.entity'
import { CreatePhoneController } from './createPhone/createPhone.controller'
import { CreatePhoneService } from './createPhone/createPhone.service'
import { DeletePhoneController } from './deletePhone/deletePhone.controller'
import { DeletePhoneService } from './deletePhone/deletePhone.service'
import { GetPhoneService } from './getPhone/getPhone.service'
import { GetPhoneController } from './getPhone/getPhones.controller'
import { GetPhonesController } from './getPhones/getPhones.controller'
import { GetPhonesService } from './getPhones/getPhones.service'

@Module({
  imports: [TypeOrmModule.forFeature([Phone, Contact])],
  providers: [CreatePhoneService, DeletePhoneService, GetPhonesService, GetPhoneService],
  controllers: [CreatePhoneController, DeletePhoneController, GetPhonesController, GetPhoneController]
})
export class PhonesModule {}
