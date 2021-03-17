import { UserInputError } from 'apollo-server';
import { inject, singleton } from 'tsyringe';
import ICreateStoreDTO from '../dtos/ICreateStoreDTO';
import Store from '../infra/typeorm/entities/Store';
import IStoresRespository from '../repositories/IStoresRepository';

@singleton()
class CreateStoreService {
  constructor(
    @inject('StoresRespository')
    private storesRepository: IStoresRespository,
  ) {}

  public async execute({
    name,
    feePercentage,
  }: Omit<ICreateStoreDTO, 'id'>): Promise<Store> {
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
