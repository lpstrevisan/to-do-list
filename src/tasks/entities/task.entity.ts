import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Member } from'../../members/entities/member.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, length: 50})
  name: string;

  @Column({ length: 140 })
  description: string;

  @Column({ nullable: false, default: false })
  finished: boolean;

  @Column()
  finishDate: Date;

  @Column({ nullable: false, default: 'Baixa' })
  priority: 'Baixa' | 'Média' | 'Alta';

  @ManyToOne(() => Member, member => member.tasks, {onDelete: 'CASCADE'})
  member: Member
}
