import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Contact } from '../../../entities/contact.entity'
import { Phone } from '../../../entities/phone.entity'
import { Repository } from 'typeorm'
import { CreatePhoneDto } from './createPhone.dto'

@Injectable()
export class CreatePhoneService {
  constructor(
    @InjectRepository(Phone) private phonesRepository: Repository<Phone>,
    @InjectRepository(Contact) private contactsRepository: Repository<Contact>
  ) {}

  async createOne(contactId: string, data: CreatePhoneDto) {
    const contact = await this.contactsRepository.findOne(contactId, { relations: ['phones'] })
    if (!contact) throw new HttpException("Phone owner hadn't been found!", HttpStatus.BAD_REQUEST)

    const phone = this.phonesRepository.create(data)
    await this.phonesRepository.save(phone)

    contact.phones = [...contact.phones, phone]

    await this.contactsRepository.save(contact)

    return phone
  }
}
