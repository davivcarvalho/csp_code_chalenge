import { Body, Controller, Post } from '@nestjs/common';
import { CreateContactDto } from './createContact.dto';
import { CreateContactService } from './createContact.service';

@Controller('contacts')
export class CreateContactController {
  constructor(private createContactService: CreateContactService) {}

  @Post()
  create(@Body() data: CreateContactDto) {
    console.log(data);

    return this.createContactService.createOne();
  }
}
