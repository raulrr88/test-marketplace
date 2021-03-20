import { getRepository, Repository } from 'typeorm';
import Purchase from '../../../../purchases/infra/typeorm/entities/Purchase';
import Store from '../../../../stores/infra/typeorm/entities/Store';
import ICreateProductDTO from '../../../dtos/ICreateProductDTO';
import IProductsRepository from '../../../repositories/IProductsRepository';
import Product from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public create(data: Omit<ICreateProductDTO, 'id'>): Promise<Product> {
    const newStore = this.ormRepository.create(data);
    return this.save(newStore);
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }

  public async update({
    id,
    name,
    price,
    store,
  }: ICreateProductDTO): Promise<boolean> {
    const { affected } = await this.ormRepository.update(id, {
      name,
      price,
      store,
    });
    return !!affected;
  }

  public findById(id: string): Promise<Product | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async getProductStore(id: string): Promise<Store | undefined> {
    const product = await this.ormRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.store', 'store')
      .where({ id })
      .getOne();
    return product?.store;
  }

  public async getProductPurchases(
    id: string,
  ): Promise<Purchase[] | undefined> {
    const product = await this.ormRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.purchases', 'purchases')
      .where({ id })
      .getOne();
    return product?.purchases;
  }

  public getAll(): Promise<Product[]> {
    return this.ormRepository.find();
  }

  public getStoreProducts(storeId: string): Promise<Product[]> {
    return this.ormRepository.find({ where: { store: { id: storeId } } });
  }

  public async delete(id: string): Promise<boolean> {
    const { affected } = await this.ormRepository.delete(id);
    return !!affected;
  }
}

export default ProductsRepository;
