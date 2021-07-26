import { Controller, Get, Param } from '@nestjs/common'
import { GetPhoneService } from './getPhone.service'

@Controller('contacts/:contactId/phones')
export class GetPhoneController {
  constructor(private getPhoneService: GetPhoneService) {}

  @Get(':id')
  async findOne(@Param('id') phoneId: string, @Param('contactId') contactId: string) {
    const phone = await this.getPhoneService.findOne(contactId, phoneId)

    return { phone: phone || null }
  }
}
