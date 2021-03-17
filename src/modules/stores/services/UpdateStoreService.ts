import { UserInputError } from 'apollo-server';
import { inject, singleton } from 'tsyringe';
import { Unique } from 'typeorm';
import Store from '../infra/typeorm/entities/Store';
import IStoresRespository from '../repositories/IStoresRepository';

interface Request {
  id: string;
  name: string;
  feePercentage: number;
}

@singleton()
class UpdateStoreService {
  constructor(
    @inject('StoresRespository')
    private storesRepository: IStoresRespository,
  ) {}

  public async excecute({ id, name, feePercentage }: Request): Promise<Store> {
    const store = await this.storesRepository.findById(id);
    if (!store) throw new UserInputError('User not found!');
    if (feePercentage > 99 || feePercentage < 0)
      throw new UserInputError(
        'Value not allowed, the maximum percentage fee is 99 and minimum is 0',
      );
    const affected = this.storesRepository.update({ id, name, feePercentage });
    const newStore = await this.storesRepository.findById(id);
    if (affected && newStore) return newStore;
    throw new Error('Something went wrong, this store was not updated!');
  }
}

export default UpdateStoreService;
