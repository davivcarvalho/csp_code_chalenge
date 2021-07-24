import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Phone } from 'src/entities/phone.entity'
import { Repository } from 'typeorm'

@Injectable()
export class GetPhonesService {
  constructor(@InjectRepository(Phone) private phonesRepository: Repository<Phone>) {}

  findAll() {
    return this.phonesRepository.find()
  }
}
