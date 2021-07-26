import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Contact } from '../../entities/contact.entity'
import { Phone } from '../../entities/phone.entity'
import { CreatePhoneController } from './createContactPhone/createPhone.controller'
import { CreatePhoneService } from './createContactPhone/createPhone.service'
import { DeletePhoneController } from './deleteContactPhone/deletePhone.controller'
import { DeletePhoneService } from './deleteContactPhone/deletePhone.service'
import { EditPhoneController } from './editContactPhone/editPhone.controller'
import { EditPhoneService } from './editContactPhone/editPhone.service'
import { GetPhoneService } from './getContactPhone/getPhone.service'
import { GetPhoneController } from './getContactPhone/getPhones.controller'
import { GetPhonesController } from './geContactPhones/getPhones.controller'
import { GetPhonesService } from './geContactPhones/getPhones.service'

@Module({
  imports: [TypeOrmModule.forFeature([Phone, Contact])],
  providers: [CreatePhoneService, DeletePhoneService, GetPhonesService, GetPhoneService, EditPhoneService],
  controllers: [
    CreatePhoneController,
    DeletePhoneController,
    GetPhonesController,
    GetPhoneController,
    EditPhoneController
  ]
})
export class PhonesModule {}
