import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Product from '../../../../products/infra/typeorm/entities/Product';
import Store from '../../../../stores/infra/typeorm/entities/Store';

@Entity('purchases')
class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, product => product.purchases)
  product: Product;

  @ManyToOne(() => Store, store => store.purchases)
  store: Store;

  @Column()
  marketplaceFee: number;

  @Column()
  storeFee: number;

  @Column()
  paymentPlatformFee: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Purchase;
