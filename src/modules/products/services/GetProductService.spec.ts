import { UserInputError } from 'apollo-server';
import FakeStoresRepository from '../../stores/repositories/fakes/FakeStoresRepository';
import CreateStoreService from '../../stores/services/CreateStoreService';
import FakeProductsRepository from '../infra/typeorm/repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';
import GetProductService from './GetProductService';

let fakeProductsRepository: FakeProductsRepository;
let fakeStoresRepository: FakeStoresRepository;
let createStore: CreateStoreService;
let createProduct: CreateProductService;
let getProduct: GetProductService;

describe('GetProduct', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeStoresRepository = new FakeStoresRepository();
    createStore = new CreateStoreService(fakeStoresRepository);
    createProduct = new CreateProductService(
      fakeProductsRepository,
      fakeStoresRepository,
    );
    getProduct = new GetProductService(fakeProductsRepository);
  });

  it('should get a product', async () => {
    const store = await createStore.execute({
      name: 'Test Store 0',
      feePercentage: 90,
    });

    const newProduct = await createProduct.execute({
      name: 'Product Test 0',
      price: 27.8,
      storeId: store.id,
    });

    const product = await getProduct.execute(newProduct.id);
    expect(product).toHaveProperty('id');
  });

  it('should not get a product with invalid ID', async () => {
    expect(getProduct.execute('123456')).rejects.toBeInstanceOf(UserInputError);
  });
});
