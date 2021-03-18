import { UserInputError } from 'apollo-server';
import { inject, singleton } from 'tsyringe';
import Store from '../infra/typeorm/entities/Store';
import IStoresRespository from '../repositories/IStoresRepository';

@singleton()
class GetStoreService {
  constructor(
    @inject('StoresRespository')
    private storesRepository: IStoresRespository,
  ) {}

  public async execute(id: string): Promise<Store> {
    const store = await this.storesRepository.findById(id);
    if (store) return store;
    throw new UserInputError('Store not found');
  }
}

export default GetStoreService;
