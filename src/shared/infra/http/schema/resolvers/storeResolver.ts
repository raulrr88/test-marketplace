import StoresController from '../../../../../modules/stores/infra/http/controllers/StoresController';
import Store from '../../../../../modules/stores/infra/typeorm/entities/Store';

interface StoreInput {
  store: Store;
}

const storeController = new StoresController();

const storeResolver = {
  Query: {
    store: (_: null, id: string): Promise<Store> => storeController.get(id),
    stores: (): Promise<Store[]> => storeController.list(),
  },
  Mutation: {
    addStore: (_: null, input: StoreInput): Promise<Store> =>
      storeController.create(input),
    updateStore: (_: null, input: StoreInput): Promise<Store> =>
      storeController.update(input),
  },
};

export default storeResolver;
