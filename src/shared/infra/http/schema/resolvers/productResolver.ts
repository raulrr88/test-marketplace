import ProductsController from '../../../../../modules/products/infra/http/controllers/ProductsController';
import Product from '../../../../../modules/products/infra/typeorm/entities/Product';
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

const productResolver = {
  Product: {
    store: (product: Product): Promise<Store> => {
      return storesController.get(product.store?.id);
    },
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
