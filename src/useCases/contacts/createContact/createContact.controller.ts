import { Body, Controller, Post } from '@nestjs/common'
import { CreateContactDto } from './createContact.dto'
import { CreateContactService } from './createContact.service'

@Controller('contacts')
export class CreateContactController {
  constructor(private createContactService: CreateContactService) {}

  @Post()
  async create(@Body() data: CreateContactDto) {
    const contact = await this.createContactService.createOne(data)

    return { contact }
  }
}
