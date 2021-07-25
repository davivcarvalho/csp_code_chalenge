import { Body, Controller, HttpCode, Param, Put } from '@nestjs/common'
import { EditPhoneDto } from './editPhone.dto'
import { EditPhoneService } from './editPhone.service'

@Controller('phone')
export class EditPhoneController {
  constructor(private editPhoneService: EditPhoneService) {}

  @Put(':phoneId')
  @HttpCode(204)
  async editOne(@Param('phoneId') phoneId: string, @Body() data: EditPhoneDto) {
    await this.editPhoneService.editOne(phoneId, data)

    return
  }
}
