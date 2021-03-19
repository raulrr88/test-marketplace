import Product from '../../products/infra/typeorm/entities/Product';
import ICreatePurchaseDTO from '../dtos/ICreatePurchaseDTO';
import Purchase from '../infra/typeorm/entities/Purchase';

interface IPurchasesRepository {
  create(input: Omit<ICreatePurchaseDTO, 'id'>): Promise<Purchase>;
  save(purchase: Purchase): Promise<Purchase>;
  get(id: string): Promise<Purchase | undefined>;
  getPurchaseProduct(id: string): Promise<Product | undefined>;
  list(): Promise<Purchase[]>;
  listStorePurchases(storeId: string): Promise<Purchase[]>;
}

export default IPurchasesRepository;
