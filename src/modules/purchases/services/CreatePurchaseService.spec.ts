import FakeProductsRepository from '../../products/infra/typeorm/repositories/fakes/FakeProductsRepository';
import CreateProductService from '../../products/services/CreateProductService';
import FakeStoresRepository from '../../stores/repositories/fakes/FakeStoresRepository';
import CreateStoreService from '../../stores/services/CreateStoreService';
import FakePurchasesRepository from '../infra/typeorm/repositories/fakes/FakePurchasesRepository';
import CreatePurchaseService from './CreatePurchaseService';

let fakeStoresRepository: FakeStoresRepository;
let fakeProductsRepository: FakeProductsRepository;
let fakePurchasesRepository: FakePurchasesRepository;
let createStore: CreateStoreService;
let createProduct: CreateProductService;
let createPurchase: CreatePurchaseService;

describe('CreatePurchase', () => {
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
  });

  it('should create a new purchase', async () => {
    const store = await createStore.execute({
      name: 'Test Store 0',
      feePercentage: 90,
    });
    const product = await createProduct.execute({
      name: 'Product Test 0',
      price: 27.8,
      storeId: store.id,
    });
    const purchase = await createPurchase.execute(product.id);
    expect(purchase).toHaveProperty('id');
  });

  it('should not create a new purchase without valid store', async () => {
    const store = await createStore.execute({
      name: 'Test Store 0',
      feePercentage: 90,
    });
    const product = await createProduct.execute({
      name: 'Product Test 0',
      price: 27.8,
      storeId: store.id,
    });
    // TODO: VALIDATE SPLIT
    Object.assign(product, { store: null });
    expect(createPurchase.execute(product.id)).rejects.toBeInstanceOf(Error);
  });

  it('should not create a new purchase without valid product ID', async () => {
    expect(createPurchase.execute('123456')).rejects.toBeInstanceOf(Error);
  });
});
