import { inject, singleton } from 'tsyringe';
import Purchase from '../infra/typeorm/entities/Purchase';
import IPurchasesRepository from '../repositories/IPurchasesRepository';

@singleton()
class ListStorePurchasesService {
  constructor(
    @inject('PurchasesRepository')
    private purchaseRepository: IPurchasesRepository,
  ) {}

  public execute(storeId: string): Promise<Purchase[]> {
    return this.purchaseRepository.listStorePurchases(storeId);
  }
}

export default ListStorePurchasesService;
