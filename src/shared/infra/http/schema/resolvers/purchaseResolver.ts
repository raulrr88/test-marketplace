import Product from '../../../../../modules/products/infra/typeorm/entities/Product';
import PurchasesController from '../../../../../modules/purchases/infra/http/controllers/PurchasesController';
import Purchase from '../../../../../modules/purchases/infra/typeorm/entities/Purchase';

interface PurchaseInput {
  purchase: {
    id: string;
    productId: string;
  };
}

const purchaseController = new PurchasesController();

const purchaseResolver = {
  Purchase: {
    product: (purchase: Purchase): Promise<Product> =>
      purchaseController.getPurchaseProduct(purchase.id),
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
