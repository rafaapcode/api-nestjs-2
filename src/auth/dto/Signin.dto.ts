import {
  IsNotEmpty,
  IsEmail,
  IsOptional,
  Length,
  IsString,
} from 'class-validator';

export class SignInDto {
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email is not valid.' })
  email: string;

  @IsNotEmpty({ message: 'Password is required.' })
  @Length(6, 50, { message: 'Password must be 6 to 50 characters.' })
  @IsString({ message: 'Password must be a String' })
  password: string;
}
