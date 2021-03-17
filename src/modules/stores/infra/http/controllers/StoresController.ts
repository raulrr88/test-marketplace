import { container } from 'tsyringe';
import CreateStoreService from '../../../services/CreateStoreService';

interface StoreInput {
  store: {
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
  public async create(input: StoreInput): Promise<Store> {
    const { name, feePercentage } = input.store;
    const createStore = container.resolve(CreateStoreService);
    return createStore.excecute({ name, feePercentage });
  }
}

export default StoresController;
