import { inject, singleton } from 'tsyringe';
import Store from '../../stores/infra/typeorm/entities/Store';
import IProductsRepository from '../repositories/IProductsRepository';

@singleton()
class GetProductStoreService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(id: string): Promise<Store> {
    const store = await this.productsRepository.getProductStore(id);
    if (store) return store;
    throw new Error('Store was not found!');
  }
}

export default GetProductStoreService;
