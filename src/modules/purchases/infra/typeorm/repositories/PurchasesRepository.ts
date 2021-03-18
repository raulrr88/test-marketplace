import { getRepository, Repository } from 'typeorm';
import IPurchasesRepository from '../../../repositories/IPurchasesRepository';
import ICreatePurchaseDTO from '../../../dtos/ICreatePurchaseDTO';
import Purchase from '../entities/Purchase';

class PurchasesRepository implements IPurchasesRepository {
  private ormRepository: Repository<Purchase>;

  constructor() {
    this.ormRepository = getRepository(Purchase);
  }

  public create(input: Omit<ICreatePurchaseDTO, 'id'>): Promise<Purchase> {
    const purchase = this.ormRepository.create(input);
    return this.save(purchase);
  }

  public save(purchase: Purchase): Promise<Purchase> {
    return this.ormRepository.save(purchase);
  }

  public get(id: string): Promise<Purchase | undefined> {
    return this.ormRepository.findOne(id);
  }

  public list(): Promise<Purchase[]> {
    return this.ormRepository.find();
  }
}

export default PurchasesRepository;
