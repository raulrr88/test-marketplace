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
    if (feePercentage > 99 || feePercentage < 0)
      throw new UserInputError(
        'Value not allowed, the maximum percentage fee is 99 and minimum is 0',
      );
    return this.storesRepository.create({ name, feePercentage });
  }
}

export default CreateStoreService;
