import { Controller, Delete, Param } from '@nestjs/common'
import { DeletePhoneService } from './deletePhone.service'

@Controller('phone')
export class DeletePhoneController {
  constructor(private deletePhoneService: DeletePhoneService) {}

  @Delete(':phoneId')
  createOne(@Param('phoneId') phoneId: string) {
    return this.deletePhoneService.deleteOne(phoneId)
  }
}
