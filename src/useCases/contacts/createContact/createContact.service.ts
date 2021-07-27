import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Contact } from '../../../entities/contact.entity'
import { Phone } from '../../../entities//phone.entity'
import { Repository } from 'typeorm'
import { CreateContactDto } from './createContact.dto'

@Injectable()
export class CreateContactService {
  constructor(
    @InjectRepository(Contact) private contactsRepository: Repository<Contact>,
    @InjectRepository(Phone) private phonesRepository: Repository<Phone>
  ) {}

  async createOne(data: CreateContactDto) {
    const phones = await this.phonesRepository.save(data.phones)

    const contact = this.contactsRepository.create({
      ...data,
      phones
    })

    return this.contactsRepository.save(contact)
  }
}
