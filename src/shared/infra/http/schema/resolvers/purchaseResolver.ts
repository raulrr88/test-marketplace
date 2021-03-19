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
    marketplaceFee: number;
    storeFee: number;
    paymentPlatformFee: number;
  };
}

const purchaseController = new PurchasesController();

const purchaseResolver = {
  Purchase: {
    // product: (purchase: Purchase): Promise<Product> =>
    //   productController.get(),
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
