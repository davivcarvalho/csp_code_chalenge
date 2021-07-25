import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Phone } from '../../../entities//phone.entity'
import { Repository } from 'typeorm'

@Injectable()
export class GetPhoneService {
  constructor(@InjectRepository(Phone) private phonesRepository: Repository<Phone>) {}

  findOne(contactId: string, phoneId: string) {
    return this.phonesRepository.findOne({ user: contactId, id: phoneId })
  }
}
