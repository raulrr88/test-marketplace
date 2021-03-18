import { inject, singleton } from 'tsyringe';
import Purchase from '../infra/typeorm/entities/Purchase';
import IPurchasesRepository from '../repositories/IPurchasesRepository';

@singleton()
class ListPurchasesService {
  constructor(
    @inject('PurchasesRepository')
    private purchaseRepository: IPurchasesRepository,
  ) {}

  public execute(): Promise<Purchase[]> {
    return this.purchaseRepository.list();
  }
}

export default ListPurchasesService;
