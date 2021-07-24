import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Contact } from 'src/entities/contact.entity'
import { Phone } from 'src/entities/phone.entity'
import { CreateContactController } from './createContact/createContact.controller'
import { CreateContactService } from './createContact/createContact.service'
import { DeleteContactController } from './deleteContact/deleteContact.controller'
import { DeleteContactService } from './deleteContact/deleteContact.service'
import { EditContactController } from './editContact/editContact.controller'
import { EditContactService } from './editContact/editContact.service'
import { GetContactController } from './getContact/getContact.controller'
import { GetContactService } from './getContact/getContact.service'
import { GetContactsController } from './getContacts/getContacts.controller'
import { GetContactsService } from './getContacts/getContacts.service'

@Module({
  imports: [TypeOrmModule.forFeature([Contact, Phone])],
  controllers: [
    CreateContactController,
    GetContactsController,
    GetContactController,
    EditContactController,
    DeleteContactController
  ],
  providers: [CreateContactService, GetContactsService, GetContactService, EditContactService, DeleteContactService]
})
export class ContactsModule {}
