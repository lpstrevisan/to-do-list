import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Length } from 'class-validator';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  @Length(5)
  name: string;
}
