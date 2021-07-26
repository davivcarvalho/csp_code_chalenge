import { Controller, Get, Param } from '@nestjs/common'
import { GetPhonesService } from './getPhones.service'

@Controller('/contacts/:contactId/phones')
export class GetPhonesController {
  constructor(private getPhonesService: GetPhonesService) {}

  @Get()
  async findAll(@Param('contactId') contactId: string) {
    const phones = await this.getPhonesService.findAll(contactId)

    return { phones }
  }
}
