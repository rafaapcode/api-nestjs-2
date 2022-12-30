import {
  IsNotEmpty,
  IsEmail,
  IsOptional,
  Length,
  IsString,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email is not valid.' })
  email: string;

  @IsNotEmpty({ message: 'Password is required.' })
  @Length(6, 50, { message: 'Password must be 6 to 50 characters.' })
  @IsString({ message: 'Password must be a String' })
  password: string;

  @IsNotEmpty({ message: 'FirstName is required.' })
  @Length(4, 100, { message: 'FirstName must be 4 to 100 characters.' })
  firstName: string;

  @IsOptional()
  lastName?: string;
}
