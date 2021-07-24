import { Contact } from 'src/entities/contact.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
