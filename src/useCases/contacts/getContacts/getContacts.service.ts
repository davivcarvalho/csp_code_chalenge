import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Contact } from '../../../entities//contact.entity'
import { Repository } from 'typeorm'

@Injectable()
export class GetContactsService {
  constructor(@InjectRepository(Contact) private contactsRepository: Repository<Contact>) {}

  async getAll() {
    const [contacts, count] = await this.contactsRepository.findAndCount({ relations: ['phones'] })

    return { contacts, count }
  }

  async filterBy(email?: string, name?: string) {
    if (!email && !name) throw new HttpException('At least one filter is required!', HttpStatus.BAD_REQUEST)

    const query = { email, firstName: name }

    if (!email) Reflect.deleteProperty(query, 'email')
    if (!name) Reflect.deleteProperty(query, 'firstName')

    return this.contactsRepository.find(query)
  }
}
