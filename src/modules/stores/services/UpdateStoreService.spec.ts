import { UserInputError } from 'apollo-server';
import FakeStoresRepository from '../repositories/fakes/FakeStoresRepository';
import CreateStoreService from './CreateStoreService';
import UpdateStoreService from './UpdateStoreService';

let fakeStoresRepository: FakeStoresRepository;
let createStore: CreateStoreService;
let updateStore: UpdateStoreService;

describe('GetStore', () => {
  beforeEach(() => {
    fakeStoresRepository = new FakeStoresRepository();
    createStore = new CreateStoreService(fakeStoresRepository);
    updateStore = new UpdateStoreService(fakeStoresRepository);
  });

  it('should update a store', async () => {
    const { id } = await createStore.execute({
      name: 'Store Test 1',
      feePercentage: 90,
    });
    const store = await updateStore.execute({
      id,
      name: 'Store Test 1A',
      feePercentage: 80,
    });
    expect(store).toHaveProperty('name');
    expect(store.name).toBe('Store Test 1A');
  });

  it('should not find a store to update', async () => {
    expect(
      updateStore.execute({
        id: '123456',
        name: 'Store Test 1A',
        feePercentage: 80,
      }),
    ).rejects.toBeInstanceOf(UserInputError);
  });

  it('should not update a store with percentage fee greater than 99', async () => {
    const { id } = await createStore.execute({
      name: 'Store Test 1',
      feePercentage: 90,
    });
    expect(
      updateStore.execute({
        id,
        name: 'Store Test 1A',
        feePercentage: 100,
      }),
    ).rejects.toBeInstanceOf(UserInputError);
  });

  it('should not update a store with percentage fee lower than 0', async () => {
    const { id } = await createStore.execute({
      name: 'Store Test 1',
      feePercentage: 90,
    });
    expect(
      updateStore.execute({
        id,
        name: 'Store Test 1A',
        feePercentage: -1,
      }),
    ).rejects.toBeInstanceOf(UserInputError);
  });
});
