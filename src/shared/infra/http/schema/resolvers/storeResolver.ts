import StoresController from '../../../../../modules/stores/infra/http/controllers/StoresController';

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

const storeController = new StoresController();

const storeResolver = {
  Query: {
    stores: async (): Promise<Store[]> => storeController.list(),
  },
  Mutation: {
    addStore: async (_: null, input: Omit<StoreInput, 'id'>): Promise<Store> =>
      storeController.create(input),
    updateStore: async (_: null, input: StoreInput): Promise<Store> =>
      storeController.update(input),
  },
};

export default storeResolver;
