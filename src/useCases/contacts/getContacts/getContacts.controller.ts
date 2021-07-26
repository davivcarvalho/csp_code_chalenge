import { Controller, Get, Query } from '@nestjs/common'
import { ApiQuery } from '@nestjs/swagger'
import { GetContactsService } from './getContacts.service'

@Controller('contacts')
export class GetContactsController {
  constructor(private getContactsService: GetContactsService) {}

  @Get()
  async findAll() {
    return this.getContactsService.getAll()
  }

  @ApiQuery({ name: 'email', required: false })
  @ApiQuery({ name: 'name', required: false })
  @Get('findByFilter')
  async findByFilter(@Query('email') email?: string, @Query('name') name?: string) {
    return this.getContactsService.filterBy(email, name)
  }
}
