import { IsNotEmpty, IsEmail } from 'class-validator';
export class ConfirmEmailDto {
  @IsNotEmpty()
  readonly code: string;
  @IsNotEmpty()
  readonly token: string;
  @IsEmail()
  readonly email: string;
}
