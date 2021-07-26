import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsOptional, Length } from 'class-validator'

export class EditContactDto {
  @IsOptional()
  @Length(2, 20)
  firstName?: string

  @ApiPropertyOptional()
  @IsOptional()
  @Length(2, 20)
  lastName?: string

  @IsOptional()
  @IsEmail()
  email?: string
}
