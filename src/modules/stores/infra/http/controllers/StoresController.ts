import { container } from 'tsyringe';
import CreateStoreService from '../../../services/CreateStoreService';
import UpdateStoreService from '../../../services/UpdateStoreService';
import ListStoresService from '../../../services/ListStoresService';

interface StoreInput {
  store: {
    id: string;
    name: string;
    feePercentage: number;
  };
}

interface Store {
  id: string;
  name: string;
  feePercentage: number;
}

class StoresController {
  public async create({ store }: Omit<StoreInput, 'id'>): Promise<Store> {
    const createStore = container.resolve(CreateStoreService);
    return createStore.excecute(store);
  }

  public async update({ store }: StoreInput): Promise<Store> {
    const updateStore = container.resolve(UpdateStoreService);
    return updateStore.excecute(store);
  }

  public async list(): Promise<Store[]> {
    const listStore = container.resolve(ListStoresService);
    return listStore.excecute();
  }
}

export default StoresController;
