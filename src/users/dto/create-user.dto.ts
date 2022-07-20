import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  readonly id?: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 30)
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 30)
  readonly password: string;

  @IsNotEmpty()
  @IsUUID()
  readonly roleId: string;
}
