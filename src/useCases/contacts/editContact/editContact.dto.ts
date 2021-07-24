import { IsEmail, IsNotEmpty, IsOptional, Length, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

class Phone {
  @Length(2, 2)
  prefix: string

  @Length(8, 9)
  number: string
}

export class EditContactDto {
  @IsOptional()
  @Length(2, 20)
  firstName: string

  @IsOptional()
  @Length(2, 20)
  lastName: string

  @IsOptional()
  @IsEmail()
  email: string

  @IsOptional()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Phone)
  phones: Phone[]
}
