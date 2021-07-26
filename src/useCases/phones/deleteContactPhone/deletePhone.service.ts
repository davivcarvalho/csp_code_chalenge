import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Phone } from '../../../entities/phone.entity'
import { Repository } from 'typeorm'

@Injectable()
export class DeletePhoneService {
  constructor(@InjectRepository(Phone) private phonesRepository: Repository<Phone>) {}

  async deleteOne(phoneId: string, contactId: string) {
    if ((await this.phonesRepository.count({ user: contactId })) < 2)
      throw new HttpException(
        'Delete action not performed because every contact must have at least one phone',
        HttpStatus.INTERNAL_SERVER_ERROR
      )

    const { affected } = await this.phonesRepository.delete({ id: phoneId, user: contactId })
    if (affected === 0) throw new HttpException('Delete action not performed!', HttpStatus.INTERNAL_SERVER_ERROR)
  }
}
