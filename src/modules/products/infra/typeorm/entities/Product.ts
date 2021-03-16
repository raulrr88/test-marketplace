import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Purchase from '../../../../purchases/infra/typeorm/entities/Purchase';
import Store from '../../../../stores/infra/typeorm/entities/Store';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @OneToMany(() => Purchase, purchase => purchase.product)
  purchases?: Purchase[];

  @ManyToOne(() => Store, store => store.products)
  store: Store;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Product;
