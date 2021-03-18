import { UserInputError } from 'apollo-server';
import { container } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import GetStoreService from '../../../../stores/services/GetStoreService';
import ICreateProductDTO from '../../../dtos/ICreateProductDTO';
import IProductsRepository from '../../../repositories/IProductsRepository';
import Product from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    storeId,
  }: Omit<ICreateProductDTO, 'id'>): Promise<Product> {
    const getStore = container.resolve(GetStoreService);
    const store = await getStore.execute(storeId);
    if (!store) throw new UserInputError('Store was not found');
    const newStore = this.ormRepository.create({
      name,
      price,
      store,
    });
    return this.save(newStore);
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }

  public async update({
    id,
    name,
    price,
    storeId,
  }: ICreateProductDTO): Promise<boolean> {
    const getStore = container.resolve(GetStoreService);
    const store = await getStore.execute(storeId);
    if (!store) throw new UserInputError('Store was not found');
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

  public async getAll(): Promise<Product[]> {
    return this.ormRepository.find();
  }

  public async delete(id: string): Promise<boolean> {
    const { affected } = await this.ormRepository.delete(id);
    return !!affected;
  }
}

export default ProductsRepository;
