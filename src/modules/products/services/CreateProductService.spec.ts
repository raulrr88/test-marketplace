import { UserInputError } from 'apollo-server';
import FakeStoresRepository from '../../stores/repositories/fakes/FakeStoresRepository';
import CreateStoreService from '../../stores/services/CreateStoreService';
import FakeProductsRepository from '../infra/typeorm/repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';

let fakeProductsRepository: FakeProductsRepository;
let fakeStoresRepository: FakeStoresRepository;
let createProduct: CreateProductService;
let createStore: CreateStoreService;

describe('CreateProduct', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeStoresRepository = new FakeStoresRepository();
    createProduct = new CreateProductService(
      fakeProductsRepository,
      fakeStoresRepository,
    );
    createStore = new CreateStoreService(fakeStoresRepository);
  });

  it('should create a product', async () => {
    const store = await createStore.execute({
      name: 'Test Store 0',
      feePercentage: 90,
    });
    const product = await createProduct.execute({
      name: 'Product Test 0',
      price: 27.8,
      storeId: store.id,
    });
    expect(product).toHaveProperty('id');
  });

  it('should not create a product without exising store', async () => {
    expect(
      createProduct.execute({
        name: 'Product Test 0',
        price: 27.8,
        storeId: '123456',
      }),
    ).rejects.toBeInstanceOf(UserInputError);
  });
});
