import { IsBoolean, IsDate, IsEnum, isNotEmpty, IsNotEmpty, IsOptional, Length, MaxLength } from "class-validator";

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

  @IsNotEmpty()
  @IsEnum(['Baixa', 'Média', 'Alta'])
  priority: string;
}