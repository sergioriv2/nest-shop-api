import { ProdToCategory } from 'src/prod-categories/entities/prod-category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column('text')
  public description!: string;

  @ManyToOne(() => ProdToCategory, (prodtocategory) => prodtocategory.category)
  public prodToCategory!: ProdToCategory[];

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  @DeleteDateColumn()
  public deletedAt?: Date;
}
