import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Phone } from 'src/entities/phone.entity'
import { Repository } from 'typeorm'

@Injectable()
export class GetPhoneService {
  constructor(@InjectRepository(Phone) private phonesRepository: Repository<Phone>) {}

  findOne(id: string) {
    return this.phonesRepository.findOne(id)
  }
}
