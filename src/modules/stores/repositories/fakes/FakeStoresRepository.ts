import { uuid } from 'uuidv4';
import ICreateStoreDTO from '../../dtos/ICreateStoreDTO';
import Store from '../../infra/typeorm/entities/Store';
import IStoresRespository from '../IStoresRepository';

class FakeStoresRepository implements IStoresRespository {
  private stores: Store[] = [];

  public async create({
    name,
    feePercentage,
  }: Omit<ICreateStoreDTO, 'id'>): Promise<Store> {
    const newStore = new Store();
    Object.assign(newStore, {
      id: uuid(),
      name,
      feePercentage,
      products: [],
      purchases: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return this.save(newStore);
  }

  public async save(store: Store): Promise<Store> {
    this.stores.push(store);
    return store;
  }

  public async findByName(name: string): Promise<Store | undefined> {
    return this.stores.find(storeItem => storeItem.name === name);
  }

  public async update({
    id,
    name,
    feePercentage,
  }: ICreateStoreDTO): Promise<boolean> {
    const storeIndex = this.stores.findIndex(store => store.id === id);
    this.stores[storeIndex] = {
      ...this.stores[storeIndex],
      name,
      feePercentage,
    };
    return true;
  }

  public async findById(id: string): Promise<Store | undefined> {
    return this.stores.find(store => store.id === id);
  }

  public async getAll(): Promise<Store[]> {
    return this.stores;
  }
}

export default FakeStoresRepository;
