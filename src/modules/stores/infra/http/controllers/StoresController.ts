import { container } from 'tsyringe';
import CreateStoreService from '../../../services/CreateStoreService';
import UpdateStoreService from '../../../services/UpdateStoreService';
import ListStoresService from '../../../services/ListStoresService';
import GetStoreService from '../../../services/GetStoreService';
import Store from '../../typeorm/entities/Store';

interface StoreInput {
  store: Store;
}

class StoresController {
  public async create({ store }: Omit<StoreInput, 'id'>): Promise<Store> {
    const createStore = container.resolve(CreateStoreService);
    return createStore.execute(store);
  }

  public async update({ store }: StoreInput): Promise<Store> {
    const updateStore = container.resolve(UpdateStoreService);
    return updateStore.execute(store);
  }

  public async list(): Promise<Store[]> {
    const listStore = container.resolve(ListStoresService);
    return listStore.execute();
  }

  public async get(id: string): Promise<Store> {
    const getStore = container.resolve(GetStoreService);
    return getStore.execute(id);
  }
}

export default StoresController;
