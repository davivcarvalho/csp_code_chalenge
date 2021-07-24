import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Contact } from 'src/entities/contact.entity'
import { Phone } from 'src/entities/phone.entity'
import { CreateContactController } from './createContact/createContact.controller'
import { CreateContactService } from './createContact/createContact.service'
import { GetContactsController } from './getContacts/getContacts.controller'
import { GetContactsService } from './getContacts/getContacts.service'

@Module({
  imports: [TypeOrmModule.forFeature([Contact, Phone])],
  controllers: [CreateContactController, GetContactsController],
  providers: [CreateContactService, GetContactsService]
})
export class ContactsModule {}
