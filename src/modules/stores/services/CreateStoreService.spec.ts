import { UserInputError } from 'apollo-server';
import FakeStoresRepository from '../repositories/fakes/FakeStoresRepository';
import CreateStoreService from './CreateStoreService';

let fakeStoresRepository: FakeStoresRepository;
let createStore: CreateStoreService;

describe('CreateStore', () => {
  beforeEach(() => {
    fakeStoresRepository = new FakeStoresRepository();
    createStore = new CreateStoreService(fakeStoresRepository);
  });

  it('should create a new store', async () => {
    const store = await createStore.execute({
      name: 'Store Test 1',
      feePercentage: 90,
    });
    expect(store).toHaveProperty('id');
  });

  it('should not create a new store with same name', async () => {
    await createStore.execute({
      name: 'Store Test 1',
      feePercentage: 90,
    });
    expect(
      createStore.execute({
        name: 'Store Test 1',
        feePercentage: 90,
      }),
    ).rejects.toBeInstanceOf(UserInputError);
  });

  it('should not create a new store with percentage fee greatter than 99', async () => {
    expect(
      createStore.execute({
        name: 'Store Test 1',
        feePercentage: 100,
      }),
    ).rejects.toBeInstanceOf(UserInputError);
  });

  it('should not create a new store with percentage fee lower than 0', async () => {
    expect(
      createStore.execute({
        name: 'Store Test 1',
        feePercentage: -1,
      }),
    ).rejects.toBeInstanceOf(UserInputError);
  });
});
