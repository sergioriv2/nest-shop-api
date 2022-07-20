import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  @Length(0, 10)
  readonly description: string;
}
