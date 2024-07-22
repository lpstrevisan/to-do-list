import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from '../../tasks/taks.entity'

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Task, task => task.member)
  tasks: Task[];
}
