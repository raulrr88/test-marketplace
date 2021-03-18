import ICreateProductDTO from '../dtos/ICreateProductDTO';
import Product from '../infra/typeorm/entities/Product';

interface IProductsRepository {
  create(data: Omit<ICreateProductDTO, 'id'>): Promise<Product>;
  update(data: ICreateProductDTO): Promise<boolean>;
  save(product: Product): Promise<Product>;
  getAll(): Promise<Product[]>;
  getStoreProducs(storeId: string): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  delete(id: string): Promise<boolean>;
}

export default IProductsRepository;
