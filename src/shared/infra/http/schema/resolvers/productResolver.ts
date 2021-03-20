import ProductsController from '../../../../../modules/products/infra/http/controllers/ProductsController';
import Product from '../../../../../modules/products/infra/typeorm/entities/Product';
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
    addProduct: (_: null, input: ProductInput): Promise<Product> => {
      const { name, price, storeId } = input.product;
      return productsController.create({ name, price, storeId });
    },
    updateProduct: (_: null, { product }: ProductInput): Promise<Product> =>
      productsController.update(product),
    deleteProduct: (_: null, id: string): Promise<string> =>
      productsController.delete(id),
  },
};

export default productResolver;
