import { IsOptional, Length } from 'class-validator'

export class EditPhoneDto {
  @Length(2, 20)
  @IsOptional()
  prefix?: string

  @Length(2, 20)
  @IsOptional()
  number?: string
}
