import ProductsController from '../../../../../modules/products/infra/http/controllers/ProductsController';
import Product from '../../../../../modules/products/infra/typeorm/entities/Product';
import PurchasesController from '../../../../../modules/purchases/infra/http/controllers/PurchasesController';
import Purchase from '../../../../../modules/purchases/infra/typeorm/entities/Purchase';
import StoresController from '../../../../../modules/stores/infra/http/controllers/StoresController';
import Store from '../../../../../modules/stores/infra/typeorm/entities/Store';

interface StoreInput {
  store: Store;
}

const storeController = new StoresController();
const productsController = new ProductsController();
const purchasesController = new PurchasesController();

const storeResolver = {
  Store: {
    products: (store: Store): Promise<Product[]> =>
      productsController.listStoreProducts(store.id),
    purchases: (): Promise<Purchase[]> => purchasesController.list(),
  },
  Query: {
    store: (_: null, id: string): Promise<Store> => storeController.get(id),
    stores: (): Promise<Store[]> => storeController.list(),
  },
  Mutation: {
    addStore: (_: null, input: StoreInput): Promise<Store> =>
      storeController.create(input),
    updateStore: (_: null, input: StoreInput): Promise<Store> =>
      storeController.update(input),
  },
};

export default storeResolver;
