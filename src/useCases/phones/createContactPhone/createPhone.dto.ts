import { Length } from 'class-validator'

export class CreatePhoneDto {
  @Length(2, 20)
  prefix: string

  @Length(2, 20)
  number: string
}
