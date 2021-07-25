import { Controller, Get, Param } from '@nestjs/common'
import { GetPhoneService } from './getPhone.service'

@Controller('phone')
export class GetPhoneController {
  constructor(private getPhoneService: GetPhoneService) {}

  @Get(':id')
  async findOne(@Param('id') phoneId: string) {
    const phone = await this.getPhoneService.findOne(phoneId)

    return { phone: phone || null }
  }
}
