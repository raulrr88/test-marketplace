import { inject, singleton } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

@singleton()
class GetProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(id: string): Promise<Product> {
    const product = await this.productsRepository.findById(id);
    if (product) return product;
    throw new Error('Product was not found!');
  }
}

export default GetProductService;
