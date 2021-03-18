import ProductsController from '../../../../../modules/products/infra/http/controllers/ProductsController';
import Product from '../../../../../modules/products/infra/typeorm/entities/Product';
import PurchasesController from '../../../../../modules/purchases/infra/http/controllers/PurchasesController';
import Purchase from '../../../../../modules/purchases/infra/typeorm/entities/Purchase';
import StoresController from '../../../../../modules/stores/infra/http/controllers/StoresController';
import Store from '../../../../../modules/stores/infra/typeorm/entities/Store';

interface PurchaseInput {
  purchase: {
    id: string;
    productId: string;
    storeId: string;
    marketplaceFee: number;
    storeFee: number;
    paymentPlatformFee: number;
  };
}

const purchaseController = new PurchasesController();
const storeController = new StoresController();
const productController = new ProductsController();

const purchaseResolver = {
  Purchase: {
    store: (purchase: Purchase): Promise<Store> =>
      storeController.get(purchase.store?.id),
    product: (product: Product): Promise<Product> =>
      productController.get(product.store?.id),
  },
  Query: {
    purchase: (_: null, id: string): Promise<Purchase> =>
      purchaseController.get(id),
    purchases: (): Promise<Purchase[]> => purchaseController.list(),
  },
  Mutation: {
    addPurchase: (
      _: null,
      input: Omit<PurchaseInput, 'id'>,
    ): Promise<Purchase> => purchaseController.create(input),
  },
};

export default purchaseResolver;