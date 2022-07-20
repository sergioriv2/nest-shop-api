import { Category } from 'src/categories/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

@Entity('prod-categories')
export class ProdToCategory {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column('uuid')
  public productId!: string;

  @Column('uuid')
  public categoryId!: string;

  @ManyToOne(() => Product, (product) => product.prodToCategory)
  public product!: Product;

  @ManyToOne(() => Category, (category) => category.prodToCategory)
  public category!: Category;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  @DeleteDateColumn()
  public deletedAt?: Date;
}
