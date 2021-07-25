import { Length } from 'class-validator'

export class CreatePhoneDTO {
  @Length(2, 20)
  prefix: string

  @Length(2, 20)
  number: string
}
