import { UserInputError } from 'apollo-server';
import FakeStoresRepository from '../../stores/repositories/fakes/FakeStoresRepository';
import CreateStoreService from '../../stores/services/CreateStoreService';
import FakeProductsRepository from '../infra/typeorm/repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';
import UpdateProductService from './UpdateProductService';

let fakeProductsRepository: FakeProductsRepository;
let fakeStoresRepository: FakeStoresRepository;
let createStore: CreateStoreService;
let createProduct: CreateProductService;
let updateProduct: UpdateProductService;

describe('UpdateProduct', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeStoresRepository = new FakeStoresRepository();
    createStore = new CreateStoreService(fakeStoresRepository);
    createProduct = new CreateProductService(
      fakeProductsRepository,
      fakeStoresRepository,
    );
    updateProduct = new UpdateProductService(
      fakeProductsRepository,
      fakeStoresRepository,
    );
  });

  it('should update a product', async () => {
    const store = await createStore.execute({
      name: 'Test Store 0',
      feePercentage: 90,
    });

    const product = await createProduct.execute({
      name: 'Product Test 2',
      price: 29.8,
      storeId: store.id,
    });

    const updatedProduct = await updateProduct.execute({
      id: product.id,
      name: 'Product Test 3',
      price: 29.8,
    });

    expect(updatedProduct).toHaveProperty('id');
    expect(updatedProduct.id).toBe(product.id);
    expect(updatedProduct.name).toBe('Product Test 3');
  });

  it('should not update a product without a valid product ID', async () => {
    const store = await createStore.execute({
      name: 'Test Store 0',
      feePercentage: 90,
    });

    expect(
      updateProduct.execute({
        id: '123456',
        name: 'Product Test 0',
        price: 27.8,
      }),
    ).rejects.toBeInstanceOf(UserInputError);
  });

  it('should not update a product without a valid store ID', async () => {
    expect(
      createProduct.execute({
        name: 'Product Test 2',
        price: 29.8,
        storeId: '123456',
      }),
    ).rejects.toBeInstanceOf(UserInputError);
  });
});
