import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Contact } from 'src/entities/contact.entity'
import { Repository } from 'typeorm'

@Injectable()
export class GetContactService {
  constructor(@InjectRepository(Contact) private contactsRepository: Repository<Contact>) {}

  getOneById(id: string) {
    return this.contactsRepository.findOne(id, { relations: ['phones'] })
  }
}
