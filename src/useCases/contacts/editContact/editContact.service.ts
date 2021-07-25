import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Contact } from '../../../entities//contact.entity'
import { Phone } from '../../../entities//phone.entity'
import { Repository } from 'typeorm'
import { EditContactDto } from './editContact.dto'

@Injectable()
export class EditContactService {
  constructor(
    @InjectRepository(Contact) private contactsRepository: Repository<Contact>,
    @InjectRepository(Phone) private phonesRepository: Repository<Phone>
  ) {}

  async editOne(id: string, data: EditContactDto) {
    const contact = await this.contactsRepository.findOne(id, { relations: ['phones'] })
    if (!contact) throw new HttpException('Not found a editable contact!', HttpStatus.BAD_REQUEST)

    if (data.email) contact.email = data.email
    if (data.firstName) contact.firstName = data.firstName
    if (data.lastName) contact.lastName = data.lastName

    await this.contactsRepository.save(contact)

    return contact
  }
}
