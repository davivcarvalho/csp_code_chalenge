import { Controller, Get, Param } from '@nestjs/common'
import { GetContactService } from './getContact.service'

@Controller('contact')
export class GetContactController {
  constructor(private getContactService: GetContactService) {}

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const contact = await this.getContactService.getOneById(id)

    return { contact: contact || null }
  }
}
