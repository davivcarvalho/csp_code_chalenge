import { Phone } from './phone.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  email: string

  @OneToMany(() => Phone, phone => phone.user, { cascade: true, onDelete: 'CASCADE' })
  phones: Phone[]
}
