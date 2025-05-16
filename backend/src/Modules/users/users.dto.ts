import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/\d/, {
    message: 'Password must contain at least one number',
  })
  @Matches(/[@$!%*?&._-]/, {
    message:
      'Password must contain at least one special character (e.g., @, !, $, %, etc.)',
  })
  @MaxLength(20, { message: 'Password cannot exceed 20 characters' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20, { message: 'Username cannot exceed 20 characters' })
  username: string;
}
