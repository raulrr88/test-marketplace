import { inject, singleton } from 'tsyringe';
import IProductsRepository from '../../products/repositories/IProductsRepository';
import ICreatePurchaseDTO from '../dtos/ICreatePurchaseDTO';
import Purchase from '../infra/typeorm/entities/Purchase';
import IPurchasesRepository from '../repositories/IPurchasesRepository';

const A_HUNDRED = 100;
const PAYMENT_PLATFORM_PERCENTAGE = 1;

@singleton()
class CreatePurchaseService {
  constructor(
    @inject('PurchasesRepository')
    private purchaseRepository: IPurchasesRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(productId: string): Promise<Purchase> {
    const productDTO = await this.splitCalc(productId);
    return this.purchaseRepository.create(productDTO);
  }

  private async splitCalc(productId: string): Promise<ICreatePurchaseDTO> {
    const product = await this.productsRepository.findById(productId);
    if (!product) throw new Error('Product not found!');
    const store = await this.productsRepository.getProductStore(productId);
    if (!store) throw new Error('Store not found!');
    const ONE_PERCENT = product.price / A_HUNDRED;
    const storePercentage = store.feePercentage;
    const storeValue = store.feePercentage * ONE_PERCENT;
    const paymentPlatformValue = PAYMENT_PLATFORM_PERCENTAGE * ONE_PERCENT;
    const marketplacePercentage =
      A_HUNDRED - PAYMENT_PLATFORM_PERCENTAGE - storePercentage;
    const marketplaceValue = marketplacePercentage * ONE_PERCENT;
    return {
      store,
      product,
      total: product.price,
      marketplacePercentage,
      marketplaceValue,
      storePercentage,
      storeValue,
      paymentPlatformPercentage: PAYMENT_PLATFORM_PERCENTAGE,
      paymentPlatformValue,
    };
  }
}

export default CreatePurchaseService;
