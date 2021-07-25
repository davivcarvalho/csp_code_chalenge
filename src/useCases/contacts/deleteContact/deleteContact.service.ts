import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Contact } from '../../../entities/contact.entity'
import { Repository } from 'typeorm'
import { Phone } from '../../../entities/phone.entity'

@Injectable()
export class DeleteContactService {
  constructor(
    @InjectRepository(Contact) private contactsRepository: Repository<Contact>,
    @InjectRepository(Phone) private phonesRepository: Repository<Phone>
  ) {}

  async deleteOne(id: string) {
    const contact = await this.contactsRepository.findOne(id, { relations: ['phones'] })
    if (!contact) throw new HttpException('Not found a contact with given ID!', HttpStatus.INTERNAL_SERVER_ERROR)

    await this.phonesRepository.delete({ user: contact.id.toString() })
    await this.contactsRepository.remove(contact)
  }
}
