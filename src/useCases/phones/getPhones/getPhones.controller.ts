import { Controller, Get } from '@nestjs/common'
import { GetPhonesService } from './getPhones.service'

@Controller('phones')
export class GetPhonesController {
  constructor(private getPhonesService: GetPhonesService) {}

  @Get()
  async findAll() {
    const phones = await this.getPhonesService.findAll()

    return { phones }
  }
}
