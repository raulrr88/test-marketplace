import FakePurchasesRepository from '../../purchases/infra/typeorm/repositories/fakes/FakePurchasesRepository';
import CreatePurchaseService from '../../purchases/services/CreatePurchaseService';
import FakeStoresRepository from '../../stores/repositories/fakes/FakeStoresRepository';
import CreateStoreService from '../../stores/services/CreateStoreService';
import FakeProductsRepository from '../infra/typeorm/repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';
import GetProductPurchasesService from './GetProductPurchasesService';

let fakeProductsRepository: FakeProductsRepository;
let fakeStoresRepository: FakeStoresRepository;
let fakePurchasesRepository: FakePurchasesRepository;
let createStore: CreateStoreService;
let createProduct: CreateProductService;
let createPurchase: CreatePurchaseService;
let getProductPurchases: GetProductPurchasesService;

describe('GetProductPurchases', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeStoresRepository = new FakeStoresRepository();
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
    getProductPurchases = new GetProductPurchasesService(
      fakeProductsRepository,
    );
  });

  // TODO: FIX

  it('should get purchases of a product', async () => {
    // const store = await createStore.execute({
    //   name: 'Test Store 0',
    //   feePercentage: 90,
    // });
    // const product = await createProduct.execute({
    //   name: 'Product Test 0',
    //   price: 27.8,
    //   storeId: store.id,
    // });
    // await createPurchase.execute(product.id);
    // await createPurchase.execute(product.id);
    // await createPurchase.execute(product.id);
    // const purchases = await getProductPurchases.execute(product.id);
    // expect(purchases.length).toEqual(3);
  });

  it('should not get purchases of a product with invalid id', async () => {
    expect(getProductPurchases.execute('123456')).rejects.toBeInstanceOf(Error);
  });
});
