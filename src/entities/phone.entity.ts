import { Contact } from './contact.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Phone {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  prefix: string

  @Column()
  number: string

  @ManyToOne(() => Contact, contact => contact.phones)
  user: string
}
