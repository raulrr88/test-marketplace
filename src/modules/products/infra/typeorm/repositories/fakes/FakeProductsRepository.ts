import { uuid } from 'uuidv4';
import Purchase from '../../../../../purchases/infra/typeorm/entities/Purchase';
import Store from '../../../../../stores/infra/typeorm/entities/Store';
import ICreateProductDTO from '../../../../dtos/ICreateProductDTO';
import IProductsRepository from '../../../../repositories/IProductsRepository';
import Product from '../../entities/Product';

class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public create(data: Omit<ICreateProductDTO, 'id'>): Promise<Product> {
    const newProduct = new Product();
    Object.assign(newProduct, {
      id: uuid(),
      ...data,
      purchases: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return this.save(newProduct);
  }

  public async save(product: Product): Promise<Product> {
    this.products.push(product);
    return product;
  }

  public async update({
    id,
    name,
    price,
    store,
  }: ICreateProductDTO): Promise<boolean> {
    const productIndex = this.products.findIndex(product => product.id === id);
    this.products[productIndex] = {
      ...this.products[productIndex],
      name,
      price,
      store,
    };
    return true;
  }

  public async findById(id: string): Promise<Product | undefined> {
    return this.products.find(product => product.id === id);
  }

  public async getProductStore(id: string): Promise<Store | undefined> {
    const product = this.products.find(productItem => productItem.id === id);
    return product?.store;
  }

  public async getProductPurchases(
    id: string,
  ): Promise<Purchase[] | undefined> {
    const product = this.products.find(productItem => productItem.id === id);
    return product?.purchases;
  }

  public async getAll(): Promise<Product[]> {
    return this.products;
  }

  public async getStoreProducts(storeId: string): Promise<Product[]> {
    const products = this.products.filter(
      productItem => productItem.store.id === storeId,
    );
    return products;
  }

  public async delete(id: string): Promise<boolean> {
    const productIndex = this.products.findIndex(product => product.id === id);
    this.products.splice(productIndex, 1);
    return true;
  }
}

export default FakeProductsRepository;
