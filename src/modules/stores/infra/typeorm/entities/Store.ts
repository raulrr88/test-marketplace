import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Product from '../../../../products/infra/typeorm/entities/Product';
import Purchase from '../../../../purchases/infra/typeorm/entities/Purchase';

@Entity('stores')
class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'float' })
  feePercentage: number;

  @OneToMany(() => Product, product => product.store)
  products?: Product[];

  @OneToMany(() => Purchase, purchase => purchase.store)
  purchases?: Purchase[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Store;
