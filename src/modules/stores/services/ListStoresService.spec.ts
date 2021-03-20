import FakeStoresRepository from '../repositories/fakes/FakeStoresRepository';
import CreateStoreService from './CreateStoreService';
import ListStoresService from './ListStoresService';

let fakeStoresRepository: FakeStoresRepository;
let listStores: ListStoresService;
let createStore: CreateStoreService;

describe('GetStore', () => {
  beforeEach(() => {
    fakeStoresRepository = new FakeStoresRepository();
    createStore = new CreateStoreService(fakeStoresRepository);
    listStores = new ListStoresService(fakeStoresRepository);
  });

  it('should list stores', async () => {
    await createStore.execute({
      name: 'Store Test 1',
      feePercentage: 90,
    });
    await createStore.execute({
      name: 'Store Test 2',
      feePercentage: 80,
    });
    const stores = await listStores.execute();
    expect(stores.length).toBeGreaterThan(1);
    expect(stores[0]).toHaveProperty('id');
  });

  it('should not list stores with an empty list', async () => {
    const stores = await listStores.execute();
    expect(stores.length).not.toBeGreaterThan(0);
  });
});
