import { Controller, Delete, HttpCode, Param } from '@nestjs/common'
import { DeleteContactService } from './deleteContact.service'

@Controller('contacts')
export class DeleteContactController {
  constructor(private deleteContactService: DeleteContactService) {}

  @Delete(':contactId')
  @HttpCode(204)
  async deleteOne(@Param('contactId') contactId: string) {
    await this.deleteContactService.deleteOne(contactId)

    return {}
  }
}
