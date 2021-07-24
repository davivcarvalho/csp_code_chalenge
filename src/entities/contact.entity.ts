import { Phone } from 'src/entities/phone.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fisrtName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @OneToMany(() => Phone, (phone) => phone.user)
  phones: Phone[];
}
