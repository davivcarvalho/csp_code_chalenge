import { Controller, Delete, HttpCode, Param } from '@nestjs/common'
import { DeletePhoneService } from './deletePhone.service'

@Controller('/contacts/:contactId/phones/')
export class DeletePhoneController {
  constructor(private deletePhoneService: DeletePhoneService) {}

  @Delete(':phoneId')
  @HttpCode(204)
  createOne(@Param('phoneId') phoneId: string, @Param('contactId') contactId: string) {
    return this.deletePhoneService.deleteOne(phoneId, contactId)
  }
}
