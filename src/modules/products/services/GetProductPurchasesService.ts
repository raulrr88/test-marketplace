import { inject, singleton } from 'tsyringe';
import Purchase from '../../purchases/infra/typeorm/entities/Purchase';
import IProductsRepository from '../repositories/IProductsRepository';

@singleton()
class GetProductPurchasesService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(id: string): Promise<Purchase[]> {
    const purchases = await this.productsRepository.getProductPurchases(id);
    if (purchases) return purchases;
    throw new Error('Purchases were not found!');
  }
}

export default GetProductPurchasesService;
