import { Controller, Get, Query } from '@nestjs/common'
import { GetContactsService } from './getContacts.service'

@Controller('contacts')
export class GetContactsController {
  constructor(private getContactsService: GetContactsService) {}

  @Get()
  async findAll() {
    return this.getContactsService.getAll()
  }

  @Get('findByFilter')
  async findByFilter(@Query('email') email?: string, @Query('name') name?: string) {
    return this.getContactsService.filterBy(email, name)
  }
}
