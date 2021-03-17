import { UserInputError } from 'apollo-server';
import { inject, singleton } from 'tsyringe';
import Store from '../infra/typeorm/entities/Store';
import IStoresRespository from '../repositories/IStoresRepository';

interface Request {
  name: string;
  feePercentage: number;
}

@singleton()
class CreateStoreService {
  constructor(
    @inject('StoresRespository')
    private storesRepository: IStoresRespository,
  ) {}

  public async excecute({ name, feePercentage }: Request): Promise<Store> {
    const store = await this.storesRepository.findByName(name);
    if (store) throw new UserInputError('This store name has already exists!');
    return this.storesRepository.create({ name, feePercentage });
  }
}

export default CreateStoreService;
