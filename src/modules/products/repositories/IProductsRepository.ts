import Purchase from '../../purchases/infra/typeorm/entities/Purchase';
import Store from '../../stores/infra/typeorm/entities/Store';
import ICreateProductDTO from '../dtos/ICreateProductDTO';
import Product from '../infra/typeorm/entities/Product';

interface IProductsRepository {
  create(data: Omit<ICreateProductDTO, 'id'>): Promise<Product>;
  update(data: ICreateProductDTO): Promise<boolean>;
  save(product: Product): Promise<Product>;
  getAll(): Promise<Product[]>;
  getStoreProducts(storeId: string): Promise<Product[]>;
  getProductStore(id: string): Promise<Store | undefined>;
  getProductPurchases(id: string): Promise<Purchase[] | undefined>;
  findById(id: string): Promise<Product | undefined>;
  delete(id: string): Promise<boolean>;
}

export default IProductsRepository;
