import { uuid } from 'uuidv4';
import Product from '../../../../../products/infra/typeorm/entities/Product';
import ICreatePurchaseDTO from '../../../../dtos/ICreatePurchaseDTO';
import IPurchasesRepository from '../../../../repositories/IPurchasesRepository';
import Purchase from '../../entities/Purchase';

class FakePurchasesRepository implements IPurchasesRepository {
  private purchases: Purchase[] = [];

  public async create(data: ICreatePurchaseDTO): Promise<Purchase> {
    const purchase = new Purchase();
    Object.assign(purchase, {
      id: uuid(),
      ...data,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return this.save(purchase);
  }

  public async save(purchase: Purchase): Promise<Purchase> {
    this.purchases.push(purchase);
    return purchase;
  }

  public async get(id: string): Promise<Purchase | undefined> {
    return this.purchases.find(purchase => purchase.id === id);
  }

  public async getPurchaseProduct(id: string): Promise<Product | undefined> {
    const purchase = this.purchases.find(
      purchaseItem => purchaseItem.id === id,
    );
    return purchase?.product;
  }

  public async list(): Promise<Purchase[]> {
    return this.purchases;
  }

  public async listStorePurchases(storeId: string): Promise<Purchase[]> {
    const purchases = this.purchases.filter(
      purchase => purchase.store.id === storeId,
    );
    return purchases;
  }
}

export default FakePurchasesRepository;
