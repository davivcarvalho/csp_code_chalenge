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

    if (data.phones) await this.editContactPhones(contact, data.phones as Phone[])

    await this.contactsRepository.save(contact)

    return await this.contactsRepository.findOne(id, { relations: ['phones'] })
  }

  async editContactPhones(contact: Contact, givenPhones: Phone[]) {
    const deletedPhones = contact.phones.filter(x => !givenPhones.some(y => y.id === x.id))
    if (deletedPhones.length > 0) await this.phonesRepository.delete(deletedPhones.map(e => e.id))

    const phonesToInsert = givenPhones.filter(e => !e.id)
    if (phonesToInsert.length > 0) {
      const insertedPhones = await this.phonesRepository.save(phonesToInsert)
      contact.phones = contact.phones.concat(insertedPhones)
    }

    const phonesToEdit = givenPhones.filter(e => !!e.id)
    if (phonesToEdit.length > 0) await this.phonesRepository.save(phonesToEdit)
  }
}
