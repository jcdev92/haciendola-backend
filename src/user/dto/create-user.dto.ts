import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'User email',
    format: 'email',
    uniqueItems: true,
    minLength: 5,
  })
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  @ApiProperty({
    description: 'User password',
    minLength: 6,
    maxLength: 50,
    format: 'password',
    example: 'myPassword123',
    uniqueItems: true,
  })
  password: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'User name',
    minLength: 1,
    example: 'John',
  })
  name: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'User lastname',
    minLength: 1,
    example: 'Doe',
  })
  lastName: string;
}
