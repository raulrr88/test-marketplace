import StoresController from '../../../../../modules/stores/infra/http/controllers/StoresController';

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

const storeController = new StoresController();

const storeResolver = {
  Mutation: {
    store: async (_: null, input: StoreInput): Promise<Store> =>
      storeController.create(input),
  },
};

export default storeResolver;
