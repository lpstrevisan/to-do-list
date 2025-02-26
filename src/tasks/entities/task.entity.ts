import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Member } from'../../members/entities/member.entity';
import { Priority } from '../../enums/task-priority.enum';

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

  @Column({ nullable: false,
            type: "enum",
            enum: Priority,
            default: Priority.LOW
          })
  priority: Priority;

  @ManyToOne(() => Member, member => member.tasks, {onDelete: 'CASCADE'})
  member: Member
}
