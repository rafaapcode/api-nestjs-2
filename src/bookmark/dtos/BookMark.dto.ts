import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class BookMarkDto {
  @IsNotEmpty({ message: 'Title must not be empty' })
  @IsString({ message: 'Title must be a String' })
  title: string;

  @IsNotEmpty({ message: 'Description must not be empty' })
  @IsString({ message: 'Description must be a String' })
  description: string;

  @IsNotEmpty({ message: 'Link must not be empty' })
  @IsUrl({}, { message: 'The link must be a valid URL.' })
  link: string;
}

export class BookMarkDtoUpdate {
  @IsNotEmpty({ message: 'Title must not be empty' })
  @IsString({ message: 'Title must be a String' })
  @IsOptional()
  title?: string;

  @IsNotEmpty({ message: 'Description must not be empty' })
  @IsString({ message: 'Description must be a String' })
  @IsOptional()
  description?: string;

  @IsNotEmpty({ message: 'Link must not be empty' })
  @IsUrl({}, { message: 'The link must be a valid URL.' })
  @IsOptional()
  link?: string;
}
