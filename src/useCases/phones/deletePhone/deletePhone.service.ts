import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Contact } from '../../../entities//contact.entity'
import { Phone } from '../../../entities//phone.entity'
import { Repository } from 'typeorm'

@Injectable()
export class DeletePhoneService {
  constructor(
    @InjectRepository(Phone) private phonesRepository: Repository<Phone>,
    @InjectRepository(Contact) private contactsRepository: Repository<Contact>
  ) {}

  async deleteOne(id: string) {
    const { affected } = await this.phonesRepository.delete(id)
    if (affected === 0) throw new HttpException('Delete action not performed!', HttpStatus.INTERNAL_SERVER_ERROR)
  }
}
