import { UserInputError } from 'apollo-server';
import { inject, singleton } from 'tsyringe';
import ICreateStoreDTO from '../dtos/ICreateStoreDTO';
import Store from '../infra/typeorm/entities/Store';
import IStoresRespository from '../repositories/IStoresRepository';

@singleton()
class UpdateStoreService {
  constructor(
    @inject('StoresRespository')
    private storesRepository: IStoresRespository,
  ) {}

  public async execute({
    id,
    name,
    feePercentage,
  }: ICreateStoreDTO): Promise<Store> {
    const store = await this.storesRepository.findById(id);
    if (!store) throw new UserInputError('Store not found!');
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