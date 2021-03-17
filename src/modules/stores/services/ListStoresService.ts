import { inject, singleton } from 'tsyringe';
import Store from '../infra/typeorm/entities/Store';
import IStoresRespository from '../repositories/IStoresRepository';

@singleton()
class ListStoresService {
  constructor(
    @inject('StoresRespository')
    private storesRepository: IStoresRespository,
  ) {}

  public async excecute(): Promise<Store[]> {
    return this.storesRepository.getAll();
  }
}

export default ListStoresService;
