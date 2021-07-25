import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Contact } from '../../../entities//contact.entity'
import { Phone } from '../../../entities//phone.entity'
import { Repository } from 'typeorm'
import { CreatePhoneDTO } from './createPhone.dto'

@Injectable()
export class CreatePhoneService {
  constructor(
    @InjectRepository(Phone) private phonesRepository: Repository<Phone>,
    @InjectRepository(Contact) private contactsRepository: Repository<Contact>
  ) {}

  async createOne(data: CreatePhoneDTO) {
    const contact = await this.contactsRepository.findOne(data.userId, { relations: ['phones'] })
    if (!contact) throw new HttpException("Phone owner hadn't been found!", HttpStatus.BAD_REQUEST)

    const phone = this.phonesRepository.create({ ...data })

    contact.phones.push(phone)

    await this.phonesRepository.save(phone)
    await this.contactsRepository.save(contact)

    return phone
  }
}
