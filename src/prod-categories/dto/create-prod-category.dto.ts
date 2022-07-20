import { IsNotEmpty, IsUUID } from 'class-validator';
export class CreateProdCategoryDto {
  @IsUUID()
  @IsNotEmpty()
  category!: string;

  @IsUUID()
  @IsNotEmpty()
  product!: string;
}
