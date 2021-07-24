import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Contact } from 'src/entities/contact.entity'
import { Phone } from 'src/entities/phone.entity'
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

    return await this.contactsRepository.save(contact)
  }
}
