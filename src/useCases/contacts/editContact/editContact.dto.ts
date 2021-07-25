import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsEmail, IsOptional, Length, ValidateNested } from 'class-validator'

class Phone {
  @IsOptional()
  @Length(2, 2)
  prefix: string

  @IsOptional()
  @Length(8, 9)
  number: string
}

export class EditContactDto {
  @IsOptional()
  @Length(2, 20)
  firstName?: string

  @IsOptional()
  @Length(2, 20)
  lastName?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => Phone)
  phones: Phone[]
}
