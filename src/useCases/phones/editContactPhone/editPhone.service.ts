import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Phone } from '../../../entities/phone.entity'
import { Repository } from 'typeorm'
import { EditPhoneDto } from './editPhone.dto'

@Injectable()
export class EditPhoneService {
  constructor(@InjectRepository(Phone) private phoneRepository: Repository<Phone>) {}

  async editOne(phoneId: string, contactId: string, data: EditPhoneDto) {
    const { number, prefix } = data
    const updateData = { number, prefix }
    if (!number) Reflect.deleteProperty(updateData, 'number')
    if (!prefix) Reflect.deleteProperty(updateData, 'prefix')
    if (!number && !prefix)
      throw new HttpException("Update action wasn't been performed! Empty request body!", HttpStatus.BAD_REQUEST)

    const { affected } = await this.phoneRepository.update({ user: contactId, id: phoneId }, updateData)

    if (!affected) throw new HttpException("Update action wasn't been performed!", HttpStatus.INTERNAL_SERVER_ERROR)
  }
}
