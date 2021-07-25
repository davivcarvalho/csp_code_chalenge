import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Phone } from '../../../entities/phone.entity'
import { Repository } from 'typeorm'

@Injectable()
export class GetPhonesService {
  constructor(@InjectRepository(Phone) private phonesRepository: Repository<Phone>) {}

  findAll(contactId: string) {
    return this.phonesRepository.find({ user: contactId })
  }
}
