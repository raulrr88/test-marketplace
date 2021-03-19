import { UserInputError } from 'apollo-server';
import { inject, singleton } from 'tsyringe';
import Product from '../../products/infra/typeorm/entities/Product';
import IPurchasesRepository from '../repositories/IPurchasesRepository';

@singleton()
class GetPurchaseProductService {
  constructor(
    @inject('PurchasesRepository')
    private purchaseRepository: IPurchasesRepository,
  ) {}

  public async execute(id: string): Promise<Product> {
    const product = await this.purchaseRepository.getPurchaseProduct(id);
    if (product) return product;
    throw new UserInputError('Product not found!');
  }
}

export default GetPurchaseProductService;
