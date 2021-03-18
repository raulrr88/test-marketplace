import ICreatePurchaseDTO from '../dtos/ICreatePurchaseDTO';
import Purchase from '../infra/typeorm/entities/Purchase';

interface IPurchasesRepository {
  create(input: Omit<ICreatePurchaseDTO, 'id'>): Promise<Purchase>;
  save(purchase: Purchase): Promise<Purchase>;
  get(id: string): Promise<Purchase | undefined>;
  list(): Promise<Purchase[]>;
}

export default IPurchasesRepository;
