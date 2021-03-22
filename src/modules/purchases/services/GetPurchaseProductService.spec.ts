import { UserInputError } from 'apollo-server';
import FakeProductsRepository from '../../products/infra/typeorm/repositories/fakes/FakeProductsRepository';
import CreateProductService from '../../products/services/CreateProductService';
import FakeStoresRepository from '../../stores/repositories/fakes/FakeStoresRepository';
import CreateStoreService from '../../stores/services/CreateStoreService';
import FakePurchasesRepository from '../infra/typeorm/repositories/fakes/FakePurchasesRepository';
import CreatePurchaseService from './CreatePurchaseService';
import GetPurchaseProductService from './GetPurchaseProductService';

let fakeStoresRepository: FakeStoresRepository;
let fakeProductsRepository: FakeProductsRepository;
let fakePurchasesRepository: FakePurchasesRepository;
let createStore: CreateStoreService;
let createProduct: CreateProductService;
let createPurchase: CreatePurchaseService;
let getPurchaseProduct: GetPurchaseProductService;

describe('GetPurchaseProduct', () => {
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
    getPurchaseProduct = new GetPurchaseProductService(fakePurchasesRepository);
  });

  it('should get a purchase product', async () => {
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
    const purchaseProduct = await getPurchaseProduct.execute(purchase.id);
    expect(purchaseProduct).toHaveProperty('id');
    expect(purchaseProduct.id).toBe(product.id);
  });

  it('should not get a purchase product without a valid product id', async () => {
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
    Object.assign(purchase, { product: null });
    expect(getPurchaseProduct.execute(purchase.id)).rejects.toBeInstanceOf(
      UserInputError,
    );
  });
});
