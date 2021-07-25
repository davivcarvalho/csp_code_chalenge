import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Phone } from 'src/entities/phone.entity'
import { Repository } from 'typeorm'
import { EditPhoneDto } from './editPhone.dto'

@Injectable()
export class EditPhoneService {
  constructor(@InjectRepository(Phone) private phoneRepository: Repository<Phone>) {}

  async editOne(id: string, data: EditPhoneDto) {
    const { number, prefix } = data
    const updateData = { number, prefix }
    if (!number) Reflect.deleteProperty(updateData, 'number')
    if (!prefix) Reflect.deleteProperty(updateData, 'prefix')

    const { affected } = await this.phoneRepository.update(id, updateData)

    if (!affected) throw new HttpException("Update action wasn't been performed!", HttpStatus.INTERNAL_SERVER_ERROR)
  }
}
