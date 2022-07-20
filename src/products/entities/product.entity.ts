import { ProdToCategory } from 'src/prod-categories/entities/prod-category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  Unique,
} from 'typeorm';

@Entity('products')
@Unique(['description'])
export class Product {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({
    length: 255,
  })
  public description!: string;

  @Column({
    nullable: true,
  })
  public image?: string;

  @Column('int')
  public price!: number;

  @OneToMany(() => ProdToCategory, (prodtocategory) => prodtocategory.product)
  public prodToCategory!: ProdToCategory[];

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  @DeleteDateColumn()
  public deletedAt?: Date;
}
