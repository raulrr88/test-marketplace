import FakeProductsRepository from '../../products/infra/typeorm/repositories/fakes/FakeProductsRepository';
import CreateProductService from '../../products/services/CreateProductService';
import FakeStoresRepository from '../../stores/repositories/fakes/FakeStoresRepository';
import CreateStoreService from '../../stores/services/CreateStoreService';
import FakePurchasesRepository from '../infra/typeorm/repositories/fakes/FakePurchasesRepository';
import CreatePurchaseService from './CreatePurchaseService';
import ListStorePurchasesService from './ListStorePurchasesService';

let fakeStoresRepository: FakeStoresRepository;
let fakeProductsRepository: FakeProductsRepository;
let fakePurchasesRepository: FakePurchasesRepository;
let createStore: CreateStoreService;
let createProduct: CreateProductService;
let createPurchase: CreatePurchaseService;
let listStorePurchases: ListStorePurchasesService;

describe('ListStorePurchases', () => {
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
    listStorePurchases = new ListStorePurchasesService(fakePurchasesRepository);
  });

  it('should list store purchases', async () => {
    const store = await createStore.execute({
      name: 'Test Store 0',
      feePercentage: 90,
    });
    const product = await createProduct.execute({
      name: 'Product Test 0',
      price: 27.8,
      storeId: store.id,
    });
    await createPurchase.execute(product.id);
    await createPurchase.execute(product.id);
    await createPurchase.execute(product.id);
    const purchases = await listStorePurchases.execute(store.id);
    expect(purchases.length).toBe(3);
  });
});
