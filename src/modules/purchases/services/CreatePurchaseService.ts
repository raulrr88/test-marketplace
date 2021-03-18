import { inject, singleton } from 'tsyringe';
import IPurchasesRepository from '../repositories/IPurchasesRepository';
import ICreatePurchaseDTO from '../dtos/ICreatePurchaseDTO';
import Purchase from '../infra/typeorm/entities/Purchase';

@singleton()
class CreatePurchaseService {
  constructor(
    @inject('PurchasesRepository')
    private purchaseRepository: IPurchasesRepository,
  ) {}

  public execute(data: Omit<ICreatePurchaseDTO, 'id'>): Promise<Purchase> {
    return this.purchaseRepository.create(data);
  }
}

export default CreatePurchaseService;
