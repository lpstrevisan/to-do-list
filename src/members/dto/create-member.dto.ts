import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateMemberDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(5)
  name: string;
}
