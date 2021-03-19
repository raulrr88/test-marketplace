import { container } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import Product from '../../../../products/infra/typeorm/entities/Product';
import GetProductService from '../../../../products/services/GetProductService';
import GetProductStoreService from '../../../../products/services/GetProductStoreService';
import ICreatePurchaseDTO from '../../../dtos/ICreatePurchaseDTO';
import IPurchasesRepository from '../../../repositories/IPurchasesRepository';
import Purchase from '../entities/Purchase';

class PurchasesRepository implements IPurchasesRepository {
  private ormRepository: Repository<Purchase>;

  constructor() {
    this.ormRepository = getRepository(Purchase);
  }

  public async create({
    productId,
  }: Omit<ICreatePurchaseDTO, 'id'>): Promise<Purchase> {
    const getProduct = container.resolve(GetProductService);
    const getStore = container.resolve(GetProductStoreService);
    const product = await getProduct.execute(productId);
    const store = await getStore.execute(productId);
    // TODO:  Calculate fee and update model
    // ADD TOTAL, Percentages and Values
    const purchase = this.ormRepository.create({
      store,
      product,
      marketplaceFee: 10,
      storeFee: 10,
      paymentPlatformFee: 10,
    });
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
