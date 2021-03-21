import { UserInputError } from 'apollo-server';
import FakeStoresRepository from '../../stores/repositories/fakes/FakeStoresRepository';
import CreateStoreService from '../../stores/services/CreateStoreService';
import FakeProductsRepository from '../infra/typeorm/repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';
import DeleteProductService from './DeleteProductService';

let fakeProductsRepository: FakeProductsRepository;
let fakeStoresRepository: FakeStoresRepository;
let createProduct: CreateProductService;
let createStore: CreateStoreService;
let deleteProduct: DeleteProductService;

describe('DeleteProduct', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeStoresRepository = new FakeStoresRepository();
    createProduct = new CreateProductService(
      fakeProductsRepository,
      fakeStoresRepository,
    );
    createStore = new CreateStoreService(fakeStoresRepository);
    deleteProduct = new DeleteProductService(fakeProductsRepository);
  });

  it('should delete a product', async () => {
    const store = await createStore.execute({
      name: 'Test Store 0',
      feePercentage: 90,
    });

    const product = await createProduct.execute({
      name: 'Product Test 0',
      price: 27.8,
      storeId: store.id,
    });

    const result = await deleteProduct.execute(product.id);
    expect(result).toBe('The product was successfully deleted');
  });

  it('should not delete a product that not exists', async () => {
    expect(deleteProduct.execute('123456')).rejects.toBeInstanceOf(
      UserInputError,
    );
  });
});
