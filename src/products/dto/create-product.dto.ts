import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly description!: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price!: number;

  @IsString()
  @IsOptional()
  readonly image?: string;

  @IsString({ each: true })
  @IsOptional()
  readonly categories?: string[];
}
