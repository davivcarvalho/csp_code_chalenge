import { IsEmail, Length, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Phone {
  @Length(2, 2)
  prefix: string;

  @Length(8, 9)
  number: string;
}

export class CreateContactDto {
  @Length(2, 20)
  firstName: string;

  @Length(2, 20)
  secondName: string;

  @IsEmail()
  email: string;

  @ValidateNested()
  @Type(() => Phone)
  phones: Phone[];
}
