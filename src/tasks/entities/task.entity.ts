import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Length } from 'class-validator';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, length: 50})
  @Length(5)
  name: string;

  @Column({ length: 140 })
  description: string;

  @Column({ nullable: false, default: false })
  finished: boolean;

  @Column()
  finishDate: Date;

  @Column({ nullable: false, default: 'Baixa' })
  priority: 'Baixa' | 'Média' | 'Alta';
}
