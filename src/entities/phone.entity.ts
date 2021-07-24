import { Contact } from 'src/entities/contact.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class Phone {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Contact, (contact) => contact.phones)
  user: string;

  @Column()
  prefix: string;

  @Column()
  number: string;
}
