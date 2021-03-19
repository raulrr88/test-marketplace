import { container } from 'tsyringe';
import Purchase from '../../../../purchases/infra/typeorm/entities/Purchase';
import Store from '../../../../stores/infra/typeorm/entities/Store';
import CreateProductService from '../../../services/CreateProductService';
import DeleteProductService from '../../../services/DeleteProductService';
import GetProductPurchasesService from '../../../services/GetProductPurchasesService';
import GetProductService from '../../../services/GetProductService';
import GetProductStoreService from '../../../services/GetProductStoreService';
import ListProductsService from '../../../services/ListProductsService';
import ListStoreProductsService from '../../../services/ListStoreProductsService';
import UpdateProductService from '../../../services/UpdateProductService';
import Product from '../../typeorm/entities/Product';

interface ProductInput {
  product: {
    id: string;
    name: string;
    price: number;
    storeId: string;
  };
}

class ProductsController {
  public create({ product }: ProductInput): Promise<Product> {
    const createProduct = container.resolve(CreateProductService);
    return createProduct.execute(product);
  }

  public get(id: string): Promise<Product> {
    const getProduct = container.resolve(GetProductService);
    return getProduct.execute(id);
  }

  public getProductPurchases(id: string): Promise<Purchase[]> {
    const getProductPurchases = container.resolve(GetProductPurchasesService);
    return getProductPurchases.execute(id);
  }

  public getProductStore(id: string): Promise<Store> {
    const getProductStore = container.resolve(GetProductStoreService);
    return getProductStore.execute(id);
  }

  public list(): Promise<Product[]> {
    const listProducts = container.resolve(ListProductsService);
    return listProducts.execute();
  }

  public listStoreProducts(storeId: string): Promise<Product[]> {
    const listStoreProducts = container.resolve(ListStoreProductsService);
    return listStoreProducts.execute(storeId);
  }

  public update({ product }: ProductInput): Promise<Product> {
    const updateProduct = container.resolve(UpdateProductService);
    return updateProduct.execute(product);
  }

  public delete(id: string): Promise<string> {
    const deleteProduct = container.resolve(DeleteProductService);
    return deleteProduct.execute(id);
  }
}

export default ProductsController;
