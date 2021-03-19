import Product from '../../products/infra/typeorm/entities/Product';
import Store from '../../stores/infra/typeorm/entities/Store';

export default interface ICreatePurchaseDTO {
  store: Store;
  product: Product;
  total: number;
  marketplacePercentage: number;
  marketplaceValue: number;
  storePercentage: number;
  storeValue: number;
  paymentPlatformPercentage: number;
  paymentPlatformValue: number;
}
