import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Contact } from 'src/entities/contact.entity'
import { Repository } from 'typeorm'

@Injectable()
export class DeleteContactService {
  constructor(@InjectRepository(Contact) private contactsRepository: Repository<Contact>) {}

  async deleteOne(id: string) {
    const { affected } = await this.contactsRepository.delete(id)
    if (affected === 0) throw new HttpException('Delete action not performed!', HttpStatus.INTERNAL_SERVER_ERROR)
  }
}
