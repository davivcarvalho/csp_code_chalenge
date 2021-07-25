import { Body, Controller, Param, Post } from '@nestjs/common'
import { CreatePhoneDTO } from './createPhone.dto'
import { CreatePhoneService } from './createPhone.service'

@Controller('/contact/:contactId/phones')
export class CreatePhoneController {
  constructor(private createPhoneService: CreatePhoneService) {}

  @Post()
  async createOne(@Param('contactId') contactId: string, @Body() data: CreatePhoneDTO) {
    const phone = await this.createPhoneService.createOne(contactId, data)

    return { phone }
  }
}
