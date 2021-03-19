import ProductsController from '../../../../../modules/products/infra/http/controllers/ProductsController';
import Product from '../../../../../modules/products/infra/typeorm/entities/Product';
import PurchasesController from '../../../../../modules/purchases/infra/http/controllers/PurchasesController';
import Purchase from '../../../../../modules/purchases/infra/typeorm/entities/Purchase';
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

const productResolver = {
  Product: {
    store: (product: Product): Promise<Store> =>
      productsController.getProductStore(product.id),
    purchases: (product: Product): Promise<Purchase[]> =>
      productsController.getProductPurchases(product.id),
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
