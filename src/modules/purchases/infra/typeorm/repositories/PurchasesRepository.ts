import { container } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import GetProductService from '../../../../products/services/GetProductService';
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
    marketplaceFee,
    storeFee,
    paymentPlatformFee,
  }: Omit<ICreatePurchaseDTO, 'id'>): Promise<Purchase> {
    const getProduct = container.resolve(GetProductService);
    const product = await getProduct.execute(productId);
    const purchase = this.ormRepository.create({
      product,
      marketplaceFee,
      storeFee,
      paymentPlatformFee,
    });
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

  public listStorePurchases(storeId: string): Promise<Purchase[]> {
    return this.ormRepository.find({ where: { store: { id: storeId } } });
  }
}

export default PurchasesRepository;
