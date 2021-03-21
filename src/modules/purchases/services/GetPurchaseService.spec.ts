import { UserInputError } from 'apollo-server';
import FakeProductsRepository from '../../products/infra/typeorm/repositories/fakes/FakeProductsRepository';
import CreateProductService from '../../products/services/CreateProductService';
import FakeStoresRepository from '../../stores/repositories/fakes/FakeStoresRepository';
import CreateStoreService from '../../stores/services/CreateStoreService';
import FakePurchasesRepository from '../infra/typeorm/repositories/fakes/FakePurchasesRepository';
import CreatePurchaseService from './CreatePurchaseService';
import GetPurchaseService from './GetPurchaseService';

let fakeStoresRepository: FakeStoresRepository;
let fakeProductsRepository: FakeProductsRepository;
let fakePurchasesRepository: FakePurchasesRepository;
let createStore: CreateStoreService;
let createProduct: CreateProductService;
let createPurchase: CreatePurchaseService;
let getPurchase: GetPurchaseService;

describe('GetPurchase', () => {
  beforeEach(() => {
    fakeStoresRepository = new FakeStoresRepository();
    fakeProductsRepository = new FakeProductsRepository();
    fakePurchasesRepository = new FakePurchasesRepository();
    createStore = new CreateStoreService(fakeStoresRepository);
    createProduct = new CreateProductService(
      fakeProductsRepository,
      fakeStoresRepository,
    );
    createPurchase = new CreatePurchaseService(
      fakePurchasesRepository,
      fakeProductsRepository,
    );
    getPurchase = new GetPurchaseService(fakePurchasesRepository);
  });

  it('should get a purchase', async () => {
    const store = await createStore.execute({
      name: 'Test Store 0',
      feePercentage: 90,
    });
    const product = await createProduct.execute({
      name: 'Product Test 0',
      price: 27.8,
      storeId: store.id,
    });
    const newPurchase = await createPurchase.execute(product.id);
    const purchase = await getPurchase.execute(newPurchase.id);
    expect(purchase).toHaveProperty('id');
    expect(purchase.id).toBe(newPurchase.id);
  });

  it('should not get a purchase without a valid ID', async () => {
    expect(getPurchase.execute('123456')).rejects.toBeInstanceOf(
      UserInputError,
    );
  });
});
