import { UserInputError } from 'apollo-server';
import FakeStoresRepository from '../repositories/fakes/FakeStoresRepository';
import CreateStoreService from './CreateStoreService';
import GetStoreService from './GetStoreService';

let fakeStoresRepository: FakeStoresRepository;
let getStore: GetStoreService;
let createStore: CreateStoreService;

describe('GetStore', () => {
  beforeEach(() => {
    fakeStoresRepository = new FakeStoresRepository();
    createStore = new CreateStoreService(fakeStoresRepository);
    getStore = new GetStoreService(fakeStoresRepository);
  });

  it('should get a store with an id', async () => {
    const { id } = await createStore.execute({
      name: 'Store Test 1',
      feePercentage: 90,
    });
    const store = await getStore.execute(id);
    expect(store).toHaveProperty('id');
    expect(store.id).toBe(id);
  });

  it('should not get a store with an invalid id', async () => {
    await createStore.execute({
      name: 'Store Test 1',
      feePercentage: 90,
    });
    expect(getStore.execute('123456')).rejects.toBeInstanceOf(UserInputError);
  });
});
