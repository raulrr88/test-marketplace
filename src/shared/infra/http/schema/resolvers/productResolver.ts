import ProductsController from '../../../../../modules/products/infra/http/controllers/ProductsController';
import Product from '../../../../../modules/products/infra/typeorm/entities/Product';
import PurchasesController from '../../../../../modules/purchases/infra/http/controllers/PurchasesController';
import Purchase from '../../../../../modules/purchases/infra/typeorm/entities/Purchase';
import StoresController from '../../../../../modules/stores/infra/http/controllers/StoresController';
import Store from '../../../../../modules/stores/infra/typeorm/entities/Store';

interface ProductInput {
  product: {
    id: string;
    name: string;
    price: number;
    storeId: string;
  };
}

const productsController = new ProductsController();
const storesController = new StoresController();
const purchasesController = new PurchasesController();

const productResolver = {
  Product: {
    store: (product: Product): Promise<Store> => {
      return storesController.get(product.store?.id);
    },
    purchases: (): Promise<Purchase[]> => purchasesController.list(),
  },
  Query: {
    product: (_: null, id: string): Promise<Product> =>
      productsController.get(id),
    products: (): Promise<Product[]> => productsController.list(),
  },
  Mutation: {
    addProduct: (_: null, input: Omit<ProductInput, 'id'>): Promise<Product> =>
      productsController.create(input),
    updateProduct: (_: null, input: ProductInput): Promise<Product> =>
      productsController.update(input),
    deleteProduct: (_: null, id: string): Promise<string> =>
      productsController.delete(id),
  },
};

export default productResolver;
