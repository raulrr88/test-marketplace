import FakeStoresRepository from '../../stores/repositories/fakes/FakeStoresRepository';
import CreateStoreService from '../../stores/services/CreateStoreService';
import FakeProductsRepository from '../infra/typeorm/repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';
import ListProductsService from './ListProductsService';

let fakeProductsRepository: FakeProductsRepository;
let fakeStoresRepository: FakeStoresRepository;
let createStore: CreateStoreService;
let createProduct: CreateProductService;
let listProducts: ListProductsService;

describe('ListProducts', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeStoresRepository = new FakeStoresRepository();
    createStore = new CreateStoreService(fakeStoresRepository);
    createProduct = new CreateProductService(
      fakeProductsRepository,
      fakeStoresRepository,
    );
    listProducts = new ListProductsService(fakeProductsRepository);
  });

  it('should list products', async () => {
    const store = await createStore.execute({
      name: 'Test Store 0',
      feePercentage: 90,
    });

    await createProduct.execute({
      name: 'Product Test 0',
      price: 27.8,
      storeId: store.id,
    });
    await createProduct.execute({
      name: 'Product Test 1',
      price: 28.8,
      storeId: store.id,
    });
    await createProduct.execute({
      name: 'Product Test 2',
      price: 29.8,
      storeId: store.id,
    });

    const products = await listProducts.execute();
    expect(products.length).toEqual(3);
  });

  it('should not list any product and return empty list', async () => {
    const products = await listProducts.execute();
    expect(products.length).toEqual(0);
  });
});
