import { inject, singleton } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

@singleton()
class ListStoreProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public execute(storeId: string): Promise<Product[]> {
    return this.productsRepository.getStoreProducs(storeId);
  }
}

export default ListStoreProductsService;
