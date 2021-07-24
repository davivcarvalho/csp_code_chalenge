import { Body, Controller, Param, Put } from '@nestjs/common'
import { EditContactDto } from './editContact.dto'
import { EditContactService } from './editContact.service'

@Controller('contact')
export class EditContactController {
  constructor(private editContactService: EditContactService) {}

  @Put(':contactId')
  async editOne(@Param('contactId') contactId: string, @Body() data: EditContactDto) {
    return await this.editContactService.editOne(contactId, data)
  }
}
