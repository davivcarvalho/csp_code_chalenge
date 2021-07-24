import { Body, Controller, Post } from '@nestjs/common'
import { CreatePhoneDTO } from './createPhone.dto'
import { CreatePhoneService } from './createPhone.service'

@Controller('phones')
export class CreatePhoneController {
  constructor(private createPhoneService: CreatePhoneService) {}

  @Post()
  createOne(@Body() data: CreatePhoneDTO) {
    return this.createPhoneService.createOne(data)
  }
}
