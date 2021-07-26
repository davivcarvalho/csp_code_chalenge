import { Body, Controller, Param, Post } from '@nestjs/common'
import { CreatePhoneDto } from './createPhone.dto'
import { CreatePhoneService } from './createPhone.service'

@Controller('/contacts/:contactId/phones')
export class CreatePhoneController {
  constructor(private createPhoneService: CreatePhoneService) {}

  @Post()
  async createOne(@Param('contactId') contactId: string, @Body() data: CreatePhoneDto) {
    const phone = await this.createPhoneService.createOne(contactId, data)

    return { phone }
  }
}
