import { UserInputError } from 'apollo-server';
import { inject, singleton } from 'tsyringe';
import Purchase from '../infra/typeorm/entities/Purchase';
import IPurchasesRepository from '../repositories/IPurchasesRepository';

@singleton()
class GetPurchaseService {
  constructor(
    @inject('PurchasesRepository')
    private purchaseRepository: IPurchasesRepository,
  ) {}

  public async execute(id: string): Promise<Purchase> {
    const purchase = await this.purchaseRepository.get(id);
    if (purchase) return purchase;
    throw new UserInputError('Purchase not found!');
  }
}

export default GetPurchaseService;
