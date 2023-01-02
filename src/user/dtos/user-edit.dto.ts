import { IsOptional, IsString, Length, IsEmail } from 'class-validator';

export class UserEditDto {
  @IsEmail({}, { message: 'Email is not valid.' })
  @IsOptional()
  email?: string;

  @IsString({ message: 'FirstName must be a string' })
  @Length(4, 30, { message: 'FirstName must be 4 to 30 characters' })
  @IsOptional()
  firstName?: string;

  @IsString({ message: 'FirstName must be a string' })
  @Length(4, 30, { message: 'LastName must be 4 to 30 characters' })
  @IsOptional()
  lastName?: string;
}
