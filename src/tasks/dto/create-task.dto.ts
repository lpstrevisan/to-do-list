import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsOptional, Length, MaxLength } from "class-validator";
import { Member } from "src/members/entities/member.entity";
import { Priority } from "../entities/task.entity";

export class CreateTaskDto {
  @IsNotEmpty()
  @Length(5, 50)
  name: string;

  @IsOptional()
  @MaxLength(140)
  description?: string

  @IsNotEmpty()
  @IsBoolean()
  finished: boolean;

  @IsDate()
  finishDate: Date;

  @IsEnum(Priority)
  @IsNotEmpty()
  priority: Priority;

  @IsNotEmpty()
  member: Member;
}