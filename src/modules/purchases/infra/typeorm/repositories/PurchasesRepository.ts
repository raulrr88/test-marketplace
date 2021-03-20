import { getRepository, Repository } from 'typeorm';
import Product from '../../../../products/infra/typeorm/entities/Product';
import ICreatePurchaseDTO from '../../../dtos/ICreatePurchaseDTO';
import IPurchasesRepository from '../../../repositories/IPurchasesRepository';
import Purchase from '../entities/Purchase';

class PurchasesRepository implements IPurchasesRepository {
  private ormRepository: Repository<Purchase>;

  constructor() {
    this.ormRepository = getRepository(Purchase);
  }

  public async create(data: ICreatePurchaseDTO): Promise<Purchase> {
    const purchase = this.ormRepository.create(data);
    return this.save(purchase);
  }

  public save(purchase: Purchase): Promise<Purchase> {
    return this.ormRepository.save(purchase);
  }

  public get(id: string): Promise<Purchase | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async getPurchaseProduct(id: string): Promise<Product | undefined> {
    const purchase = await this.ormRepository
      .createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.product', 'product')
      .where({ id })
      .getOne();
    return purchase?.product;
  }

  public list(): Promise<Purchase[]> {
    return this.ormRepository.find();
  }

  public listStorePurchases(storeId: string): Promise<Purchase[]> {
    return this.ormRepository.find({ where: { store: { id: storeId } } });
  }
}

export default PurchasesRepository;
