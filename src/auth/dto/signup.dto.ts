import { IsNotEmpty, IsEmail } from 'class-validator';
export class SignupDto {
  @IsNotEmpty()
  readonly lastName: string;
  @IsNotEmpty()
  readonly firstName: string;
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly sex: string;
  @IsNotEmpty()
  readonly avatar: string;
  @IsNotEmpty()
  readonly phoneNumber: string;
  @IsNotEmpty()
  readonly birthday: string;
  @IsNotEmpty()
  readonly province: string;
  @IsNotEmpty()
  readonly password: string;
}
